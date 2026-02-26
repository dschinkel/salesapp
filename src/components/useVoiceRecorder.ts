import { useState } from 'react';

export interface TranscriptionRepository {
  transcribe: (audio: Blob) => Promise<string>;
}

export function useVoiceRecorder({
  transcriptionRepository,
}: { transcriptionRepository?: TranscriptionRepository } = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const transcribeAudio = async (audio: Blob) => {
    if (transcriptionRepository) {
      const result = await transcriptionRepository.transcribe(audio);
      setTranscript(result);
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
