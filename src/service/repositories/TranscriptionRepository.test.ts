import { createTranscriptionRepository } from './TranscriptionRepository';

describe('Transcription Repository', () => {
  test('formats system prompt', async () => {
    let capturedPrompt: string | null = null;
    let capturedAudio: Buffer | null = null;
    let capturedMimetype: string | null = null;

    const fakeGeminiClient = {
      generateContent: async (prompt: string, audioBuffer: Buffer, mimetype: string) => {
        capturedPrompt = prompt;
        capturedAudio = audioBuffer;
        capturedMimetype = mimetype;
        return 'mock gemini transcript';
      },
    };

    const repository = createTranscriptionRepository({ geminiClient: fakeGeminiClient });

    const audioData = Buffer.from('test audio data');
    const result = await repository.transcribe(audioData, 'audio/webm');

    expect(result).toBe('mock gemini transcript');
    expect(capturedAudio).toBe(audioData);
    expect(capturedMimetype).toBe('audio/webm');
    expect(capturedPrompt).toContain('You are a sales assistant transcriber');
  });
});
