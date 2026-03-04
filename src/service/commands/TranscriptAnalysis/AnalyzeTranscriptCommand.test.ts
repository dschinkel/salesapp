import { createAnalyzeTranscriptCommand } from './AnalyzeTranscriptCommand';

describe('Analyze Transcript Command', () => {
  it('orchestrates transcript analysis', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let transcriptText = '';
    let questionList: string[] = [];

    const fakeRepository = {
      analyze: async (t: string, q: string[]) => {
        transcriptText = t;
        questionList = q;
        return answeredQuestions;
      },
    };

    const command = createAnalyzeTranscriptCommand({ analysisRepository: fakeRepository as any });
    const result = await command.execute({ transcript, questions });

    expect(transcriptText).toBe(transcript);
    expect(questionList).toEqual(questions);
    expect(result).toEqual({ answeredQuestions });
  });
});
