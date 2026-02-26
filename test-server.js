import FormData from 'form-data';
import fetch from 'node-fetch';
(async () => {
  try {
    const form = new FormData();
    form.append('audio', Buffer.from('dummy'), { filename: 'test.webm', contentType: 'audio/webm' });
    const res = await fetch('http://localhost:3001/api/transcribe', { method: 'POST', body: form });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e);
  }
})();
