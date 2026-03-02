import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-pro'];

  for (const m of models) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent('Say hi');
      const response = await result.response;
      console.log(m, 'SUCCESS:', response.text());
      return;
    } catch (e) {
      console.log(m, 'ERROR:', e.status, e.message);
    }
  }
}
test();
