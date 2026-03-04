import { createTranscriptAnalysisRepository } from './TranscriptAnalysisRepository';

describe('Transcript Analysis Repository', () => {
  it('analyzes transcript', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let transcriptText = '';
    let questionList: string[] = [];

    const fakeGeminiClient = {
      analyzeTranscript: async (t: string, q: string[]) => {
        transcriptText = t;
        questionList = q;
        return answeredQuestions;
      },
    };

    const repository = createTranscriptAnalysisRepository({ geminiClient: fakeGeminiClient as any });
    const result = await repository.analyze(transcript, questions);

    expect(transcriptText).toBe(transcript);
    expect(questionList).toEqual(questions);
    expect(result).toEqual(answeredQuestions);
  });
});
