import request from 'supertest';
import Koa from 'koa';
import multer from '@koa/multer';
import { createTranscriptionController } from './TranscriptionController';

describe('Transcription Controller Error Handling', () => {
  test('returns 429 when Gemini API quota is exceeded', async () => {
    const quotaError = new Error('Too Many Requests');
    (quotaError as any).status = 429;

    const fakeCommand = {
      execute: async () => {
        throw quotaError;
      },
    };

    const app = new Koa();
    const controller = createTranscriptionController(fakeCommand as any);
    app.use(controller.routes());
    app.use(controller.allowedMethods());

    const res = await request(app.callback())
      .post('/api/transcribe')
      .attach('audio', Buffer.from('test audio'), 'test.webm');

    expect(res.status).toBe(429);
    expect(res.body.error).toContain('Gemini API Quota exceeded');
  });

  test('returns 500 for other unexpected errors', async () => {
    const otherError = new Error('Something went wrong');

    const fakeCommand = {
      execute: async () => {
        throw otherError;
      },
    };

    const app = new Koa();
    const controller = createTranscriptionController(fakeCommand as any);
    app.use(controller.routes());
    app.use(controller.allowedMethods());

    const res = await request(app.callback())
      .post('/api/transcribe')
      .attach('audio', Buffer.from('test audio'), 'test.webm');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Transcription failed');
  });
});
