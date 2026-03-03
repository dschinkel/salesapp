export interface HttpClient {
  post: (url: string, data: any) => Promise<{ answeredQuestions: string[] }>;
}

export interface TranscriptAnalysisRepositoryDependencies {
  httpClient: HttpClient;
}

export function createTranscriptAnalysisRepository({ httpClient }: TranscriptAnalysisRepositoryDependencies) {
  return {
    analyze: async (transcript: string, questions: string[]): Promise<string[]> => {
      const response = await httpClient.post('/api/analyze-transcript', { transcript, questions });
      return response.answeredQuestions;
    },
  };
}
