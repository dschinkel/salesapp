import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createTranscriptAnalysisController } from './TranscriptAnalysisController';

describe('Transcript Analysis Controller', () => {
  it('sends questions and answers to be analyzed', async () => {
    const transcript = 'The company name is Acme Corp.';
    const questions = ['What is the company name?'];
    const answeredQuestions = ['What is the company name?'];

    let capturedRequest = null;

    const fakeCommand = {
      execute: async (req: any) => {
        capturedRequest = req;
        return { answeredQuestions };
      },
    };

    const app = new Koa();
    app.use(bodyParser());
    const controller = createTranscriptAnalysisController(fakeCommand as any);
    app.use(controller.routes());
    app.use(controller.allowedMethods());

    const res = await request(app.callback()).post('/api/analyze-transcript').send({ transcript, questions });

    expect(res.status).toBe(200);
    expect(capturedRequest).toEqual({ transcript, questions });
    expect(res.body).toEqual({ answeredQuestions });
  });
});
