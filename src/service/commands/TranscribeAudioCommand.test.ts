import { createTranscribeAudioCommand } from './TranscribeAudioCommand';

describe('Transcribe Audio Command', () => {
  test('orchestrates transcription', async () => {
    let capturedAudio: Buffer | null = null;
    let capturedMimetype: string | null = null;

    const fakeRepository = {
      transcribe: async (audioBuffer: Buffer, mimetype: string) => {
        capturedAudio = audioBuffer;
        capturedMimetype = mimetype;
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
    expect(capturedAudio).toBe(request.audioBuffer);
    expect(capturedMimetype).toBe('audio/webm');
  });
});
