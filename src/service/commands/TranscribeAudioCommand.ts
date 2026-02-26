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
