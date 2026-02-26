export interface GeminiClient {
  generateContent(prompt: string, audioBuffer: Buffer, mimetype: string): Promise<string>;
}

export interface TranscriptionRepositoryDependencies {
  geminiClient: GeminiClient;
}

export function createTranscriptionRepository({ geminiClient }: TranscriptionRepositoryDependencies) {
  return {
    async transcribe(audioBuffer: Buffer, mimetype: string): Promise<string> {
      const systemPrompt = `You are a sales assistant transcriber. Transcribe the following audio accurately.`;
      return geminiClient.generateContent(systemPrompt, audioBuffer, mimetype);
    },
  };
}
