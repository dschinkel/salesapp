import { createTranscriptAnalysisRepository } from './TranscriptAnalysisRepository';

describe('Transcript Analysis Repository', () => {
  it('calls gemini client for transcript analysis', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let capturedTranscript = '';
    let capturedQuestions: string[] = [];

    const fakeGeminiClient = {
      analyzeTranscript: async (t: string, q: string[]) => {
        capturedTranscript = t;
        capturedQuestions = q;
        return answeredQuestions;
      },
    };

    const repository = createTranscriptAnalysisRepository({ geminiClient: fakeGeminiClient as any });
    const result = await repository.analyze(transcript, questions);

    expect(capturedTranscript).toBe(transcript);
    expect(capturedQuestions).toEqual(questions);
    expect(result).toEqual(answeredQuestions);
  });
});
