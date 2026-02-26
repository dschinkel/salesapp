export interface TranscribeAudioRequest {
  audioBuffer: Buffer;
  mimetype: string;
}

export interface TranscribeAudioResponse {
  transcript: string;
}

export interface TranscribeAudioCommand {
  execute(request: TranscribeAudioRequest): Promise<TranscribeAudioResponse>;
}

export interface TranscriptionRepository {
  transcribe(audioBuffer: Buffer, mimetype: string): Promise<string>;
}

export interface TranscribeAudioCommandDependencies {
  transcriptionRepository: TranscriptionRepository;
}

export function createTranscribeAudioCommand({
  transcriptionRepository,
}: TranscribeAudioCommandDependencies): TranscribeAudioCommand {
  return {
    async execute(request: TranscribeAudioRequest): Promise<TranscribeAudioResponse> {
      const transcript = await transcriptionRepository.transcribe(request.audioBuffer, request.mimetype);
      return { transcript };
    },
  };
}
