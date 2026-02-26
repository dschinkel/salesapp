import { useState, useRef } from 'react';

export interface TranscriptionRepository {
  transcribe: (audio: Blob) => Promise<string>;
}

export function useVoiceRecorder({
  transcriptionRepository,
}: { transcriptionRepository?: TranscriptionRepository } = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
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
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audio: Blob) => {
    if (transcriptionRepository) {
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
    startRecording,
    stopRecording,
    transcribeAudio,
  };
}
