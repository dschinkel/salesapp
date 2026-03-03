export interface AnalysisRepository {
  analyze: (transcript: string, questions: string[]) => Promise<string[]>;
}

export interface AnalyzeTranscriptCommandDependencies {
  analysisRepository: AnalysisRepository;
}

export function createAnalyzeTranscriptCommand({ analysisRepository }: AnalyzeTranscriptCommandDependencies) {
  return {
    execute: async ({ transcript, questions }: { transcript: string; questions: string[] }) => {
      const answeredQuestions = await analysisRepository.analyze(transcript, questions);
      return { answeredQuestions };
    },
  };
}
