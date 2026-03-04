import { createTranscriptionRepository } from './TranscriptionRepository';

describe('Transcription Repository', () => {
  test('formats system prompt', async () => {
    let promptText: string | null = null;
    let audio: Buffer | null = null;
    let mimeType: string | null = null;

    const fakeGeminiClient = {
      generateContent: async (prompt: string, buffer: Buffer, type: string) => {
        promptText = prompt;
        audio = buffer;
        mimeType = type;
        return 'mock gemini transcript';
      },
      analyzeTranscript: async () => [],
    };

    const repository = createTranscriptionRepository({ geminiClient: fakeGeminiClient });

    const audioData = Buffer.from('test audio data');
    const result = await repository.transcribe(audioData, 'audio/webm');

    expect(result).toBe('mock gemini transcript');
    expect(audio).toBe(audioData);
    expect(mimeType).toBe('audio/webm');
    expect(promptText).toContain('You are a sales assistant transcriber');
  });
});
