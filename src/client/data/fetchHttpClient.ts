import { HttpClient } from '../repositories/TranscriptionRepository';

export const fetchHttpClient: any = {
  async post(url: string, data: any): Promise<any> {
    const isFormData = data instanceof FormData;
    const response = await fetch(url, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};
