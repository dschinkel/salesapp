import { createServer } from './app';

const PORT = process.env.PORT || 3001;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}`);
});
