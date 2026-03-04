import { createTranscribeAudioCommand } from './TranscribeAudioCommand';

describe('Transcribe Audio Command', () => {
  test('orchestrates transcription', async () => {
    let audio: Buffer | null = null;
    let mimeType: string | null = null;

    const fakeRepository = {
      transcribe: async (audioBuffer: Buffer, mimetype: string) => {
        audio = audioBuffer;
        mimeType = mimetype;
        return 'orchestrated transcript result';
      },
    };

    const command = createTranscribeAudioCommand({ transcriptionRepository: fakeRepository });

    const request = {
      audioBuffer: Buffer.from('fake audio'),
      mimetype: 'audio/webm',
    };

    const response = await command.execute(request);

    expect(response.transcript).toBe('orchestrated transcript result');
    expect(audio).toBe(request.audioBuffer);
    expect(mimeType).toBe('audio/webm');
  });
});
