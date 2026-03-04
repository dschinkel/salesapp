export interface GeminiClient {
  analyzeTranscript: (transcript: string, questions: string[]) => Promise<string[]>;
}

export interface TranscriptAnalysisRepositoryDependencies {
  geminiClient: GeminiClient;
}

export function createTranscriptAnalysisRepository({ geminiClient }: TranscriptAnalysisRepositoryDependencies) {
  return {
    analyze: async (transcript: string, questions: string[]): Promise<string[]> => {
      return await geminiClient.analyzeTranscript(transcript, questions);
    },
  };
}
