import { createAnalyzeTranscriptCommand } from './AnalyzeTranscriptCommand';

describe('Analyze Transcript Command', () => {
  it('orchestrates transcript analysis', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let capturedTranscript = '';
    let capturedQuestions: string[] = [];

    const fakeRepository = {
      analyze: async (t: string, q: string[]) => {
        capturedTranscript = t;
        capturedQuestions = q;
        return answeredQuestions;
      },
    };

    const command = createAnalyzeTranscriptCommand({ analysisRepository: fakeRepository as any });
    const result = await command.execute({ transcript, questions });

    expect(capturedTranscript).toBe(transcript);
    expect(capturedQuestions).toEqual(questions);
    expect(result).toEqual({ answeredQuestions });
  });
});
