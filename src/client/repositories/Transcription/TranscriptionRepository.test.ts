import { createTranscriptionRepository } from './TranscriptionRepository';

describe('Transcription Repository', () => {
  test('sends audio', async () => {
    let formData: FormData | null = null;

    const fakeHttpClient = {
      post: async (url: string, data: FormData) => {
        formData = data;
        return { transcript: 'test transcript' };
      },
    };

    const repository = createTranscriptionRepository({ httpClient: fakeHttpClient });

    const audioBlob = new Blob(['audio data'], { type: 'audio/webm' });
    const result = await repository.transcribe(audioBlob);

    expect(result).toBe('test transcript');
    expect(formData).toBeInstanceOf(FormData);
    expect(formData?.get('audio')).toBeInstanceOf(File);
    const appendedFile = formData?.get('audio') as File;
    expect(appendedFile.type).toBe('audio/webm');
    expect(appendedFile.size).toBe(audioBlob.size);
  });
});
