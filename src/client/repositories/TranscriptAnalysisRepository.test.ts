import { createTranscriptAnalysisRepository } from './TranscriptAnalysisRepository';

describe('Transcript Analysis Repository', () => {
  it('sends questions and answers to be analyzed', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let capturedUrl = '';
    let capturedData = null;

    const fakeHttpClient = {
      post: async (url: string, data: any) => {
        capturedUrl = url;
        capturedData = data;
        return { answeredQuestions };
      },
    };

    const repository = createTranscriptAnalysisRepository({ httpClient: fakeHttpClient });
    const result = await repository.analyze(transcript, questions);

    expect(capturedUrl).toBe('/api/analyze-transcript');
    expect(capturedData).toEqual({ transcript, questions });
    expect(result).toEqual(answeredQuestions);
  });
});
