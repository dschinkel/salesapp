import { createTranscriptionRepository } from './TranscriptionRepository';

describe('Transcription Repository', () => {
  test('sends audio', async () => {
    let capturedFormData: FormData | null = null;

    const fakeHttpClient = {
      post: async (url: string, data: FormData) => {
        capturedFormData = data;
        return { transcript: 'test transcript' };
      },
    };

    const repository = createTranscriptionRepository({ httpClient: fakeHttpClient });

    const audioBlob = new Blob(['audio data'], { type: 'audio/webm' });
    const result = await repository.transcribe(audioBlob);

    expect(result).toBe('test transcript');
    expect(capturedFormData).toBeInstanceOf(FormData);
    expect(capturedFormData?.get('audio')).toBeInstanceOf(File);
    const appendedFile = capturedFormData?.get('audio') as File;
    expect(appendedFile.type).toBe('audio/webm');
    expect(appendedFile.size).toBe(audioBlob.size);
  });
});
