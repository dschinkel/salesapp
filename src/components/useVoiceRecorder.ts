import { useState, useRef } from 'react';

export interface TranscriptionRepository {
  transcribe: (audio: Blob) => Promise<string>;
}

export function useVoiceRecorder({
  transcriptionRepository,
}: { transcriptionRepository?: TranscriptionRepository } = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [transcriptionSource, setTranscriptionSource] = useState<'gemini' | 'browser'>('gemini');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const permissionsCheckedRef = useRef(false);
  const shouldBeRecordingRef = useRef(false);
  const retryDelayRef = useRef(0);
  const consecutiveNetworkErrorsRef = useRef(0);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startBrowserRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-US';

    recognition.onstart = () => {
      // We don't reset here anymore, we wait for a result or some successful duration
    };

    recognition.onresult = (event: any) => {
      retryDelayRef.current = 0; // Reset backoff on successful result
      consecutiveNetworkErrorsRef.current = 0; // Reset consecutive errors
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event: any) => {
      if (['not-allowed', 'service-not-allowed'].includes(event.error)) {
        console.error('Critical speech recognition error:', event.error);
        shouldBeRecordingRef.current = false;
        setIsRecording(false);
      } else {
        // no-speech, network, aborted, etc. are treated as transient
        console.warn('Speech recognition transient error:', event.error);
        if (event.error === 'network') {
          consecutiveNetworkErrorsRef.current++;
          if (consecutiveNetworkErrorsRef.current >= 5) {
            console.error('Speech recognition stopped: too many network errors');
            shouldBeRecordingRef.current = false;
            setIsRecording(false);
          } else {
            // Exponential backoff for network errors (1s, 2s, 4s, 8s, 16s)
            retryDelayRef.current = retryDelayRef.current === 0 ? 1000 : Math.min(retryDelayRef.current * 2, 16000);
          }
        }
      }
    };

    recognition.onend = () => {
      if (shouldBeRecordingRef.current) {
        if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);

        const restart = () => {
          try {
            startBrowserRecognition();
          } catch (e) {
            console.error('Failed to restart speech recognition:', e);
            setIsRecording(false);
          }
        };

        if (retryDelayRef.current === 0) {
          restart();
        } else {
          restartTimeoutRef.current = setTimeout(restart, retryDelayRef.current);
        }
      } else {
        setIsRecording(false);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const startRecording = async () => {
    setTranscript('');
    try {
      if (transcriptionSource === 'browser') {
        shouldBeRecordingRef.current = true;
        if (!permissionsCheckedRef.current) {
          // Invoke for permissions as per spec F3.8.2
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
          permissionsCheckedRef.current = true;
        }

        startBrowserRecognition();
        return;
      }

      // Gemini source path
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    shouldBeRecordingRef.current = false;
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
  };

  const transcribeAudio = async (audio: Blob) => {
    if (transcriptionSource === 'gemini' && transcriptionRepository) {
      try {
        const result = await transcriptionRepository.transcribe(audio);
        setTranscript(result);
      } catch (e) {
        console.error('Transcription failed', e);
      }
    }
  };

  return {
    isRecording,
    transcript,
    transcriptionSource,
    setTranscriptionSource,
    startRecording,
    stopRecording,
    transcribeAudio,
  };
}
