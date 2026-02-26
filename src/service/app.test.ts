import request from 'supertest';
import { createServer } from './app';

describe('Service App', () => {
  test('health endpoint responds ok', async () => {
    const app = createServer();
    const server = app.listen();
    try {
      const res = await request(server).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    } finally {
      server.close();
    }
  });
});
