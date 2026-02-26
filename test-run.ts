import { createServer } from './src/service/app';
const app = createServer();
const server = app.listen(3002, () => {
  console.log('Server running on 3002');
  setTimeout(() => server.close(), 3000);
});
