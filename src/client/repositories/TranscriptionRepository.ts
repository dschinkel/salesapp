export interface HttpClient {
  post: (url: string, data: FormData) => Promise<{ transcript: string }>;
}

export interface TranscriptionRepositoryDependencies {
  httpClient: HttpClient;
}

export function createTranscriptionRepository({ httpClient }: TranscriptionRepositoryDependencies) {
  return {
    transcribe: async (audio: Blob): Promise<string> => {
      const formData = new FormData();
      formData.append('audio', audio);

      const response = await httpClient.post('/api/transcribe', formData);
      return response.transcript;
    },
  };
}
