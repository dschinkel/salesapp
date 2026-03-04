import { useState } from 'react';

export interface AnalysisRepository {
  analyze: (transcript: string, questions: string[]) => Promise<string[]>;
}

export function useTranscriptAnalysis({ analysisRepository }: { analysisRepository: AnalysisRepository }) {
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

  const analyzeTranscript = async (transcript: string, questions: string[]) => {
    const result = await analysisRepository.analyze(transcript, questions);
    setAnsweredQuestions(result);
  };

  return {
    answeredQuestions,
    analyzeTranscript,
  };
}
