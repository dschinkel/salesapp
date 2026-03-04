import multer from '@koa/multer';
import Router from '@koa/router';
import { TranscribeAudioCommand } from '../../commands/Transcription/TranscribeAudioCommand';

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
    } catch (error: any) {
      console.error('Transcription error:', error);
      if (error.status === 429) {
        ctx.status = 429;
        ctx.body = { error: 'Gemini API Quota exceeded. Please try again later.' };
        return;
      }
      ctx.status = 500;
      ctx.body = { error: 'Transcription failed' };
    }
  });

  return router;
}
