import multer from '@koa/multer';
import Router from '@koa/router';
import { TranscribeAudioCommand } from '../commands/TranscribeAudioCommand';

export function createTranscriptionController(command: TranscribeAudioCommand) {
  const router = new Router();
  const upload = multer();

  router.post('/api/transcribe', upload.single('audio'), async (ctx) => {
    // @ts-ignore
    const file = ctx.request.file;
    if (!file) {
      ctx.status = 400;
      ctx.body = { error: 'No audio file provided' };
      return;
    }

    const requestDto = {
      audioBuffer: file.buffer,
      mimetype: file.mimetype,
    };

    try {
      const responseDto = await command.execute(requestDto);
      ctx.body = responseDto;
    } catch (error) {
      console.error('Transcription error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Transcription failed' };
    }
  });

  return router;
}
