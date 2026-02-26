import Koa from 'koa';
import Router from '@koa/router';
import { createTranscriptionController } from './controllers/TranscriptionController';

export function createServer() {
  const app = new Koa();
  const router = new Router();

  // Basic health check
  router.get('/health', (ctx) => {
    ctx.body = { status: 'ok' };
  });

  const fakeCommand = {
    execute: async () => ({ transcript: 'Hello from Koa backend' }),
  };
  const transcriptionController = createTranscriptionController(fakeCommand);

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(transcriptionController.routes());
  app.use(transcriptionController.allowedMethods());

  return app;
}
