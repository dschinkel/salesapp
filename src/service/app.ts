import Koa from 'koa';
import Router from '@koa/router';
import { createTranscriptionController } from './controllers/TranscriptionController';
import { createTranscribeAudioCommand } from './commands/TranscribeAudioCommand';
import { createTranscriptionRepository } from './repositories/TranscriptionRepository';
import { createGeminiClient } from './data/GeminiClient';

export function createServer() {
  const app = new Koa();
  const router = new Router();

  // Basic health check
  router.get('/health', (ctx) => {
    ctx.body = { status: 'ok' };
  });

  const geminiClient = createGeminiClient({ apiKey: process.env.GEMINI_API_KEY });
  const transcriptionRepository = createTranscriptionRepository({ geminiClient });
  const command = createTranscribeAudioCommand({ transcriptionRepository });

  const transcriptionController = createTranscriptionController(command);

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(transcriptionController.routes());
  app.use(transcriptionController.allowedMethods());

  return app;
}
