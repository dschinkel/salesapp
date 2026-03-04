import { createTranscriptAnalysisRepository } from './TranscriptAnalysisRepository';

describe('Transcript Analysis Repository', () => {
  it('sends questions and answers to be analyzed', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let url = '';
    let data = null;

    const httpClient = {
      post: async (requestUrl: string, requestData: any) => {
        url = requestUrl;
        data = requestData;
        return { answeredQuestions };
      },
    };

    const repository = createTranscriptAnalysisRepository({ httpClient });
    const result = await repository.analyze(transcript, questions);

    expect(url).toBe('/api/analyze-transcript');
    expect(data).toEqual({ transcript, questions });
    expect(result).toEqual(answeredQuestions);
  });
});
