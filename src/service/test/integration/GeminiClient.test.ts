import { createGeminiClient } from '../../data/GeminiClient';

describe('Gemini Client', () => {
  test('sends audio', async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // eslint-disable-next-line no-console
      console.warn('GEMINI_API_KEY not set; skipping data-layer integration test.');
      return;
    }

    const client = createGeminiClient({ apiKey });

    const dummyAudio = Buffer.from('RIFF$dummywebm', 'ascii');
    const mimetype = 'audio/webm';

    const result = await client.generateContent('Please transcribe this audio.', dummyAudio, mimetype);

    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  }, 30000);
});
