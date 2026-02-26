import { HttpClient } from '../repositories/TranscriptionRepository';

export const fetchHttpClient: HttpClient = {
  async post(url: string, data: FormData): Promise<{ transcript: string }> {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};
