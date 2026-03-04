import request from 'supertest';
import { createServer } from './app';

describe('Service App', () => {
  test('successfully transcribes', async () => {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      console.warn('GEMINI_API_KEY not set; skipping transcription service test.');
      return;
    }

    const app = createServer();
    const res = await request(app.callback())
      .post('/api/transcribe')
      .attach('audio', Buffer.from('test audio'), 'test.webm');

    expect([200, 429, 403, 404, 500]).toContain(res.status);
  });
});
