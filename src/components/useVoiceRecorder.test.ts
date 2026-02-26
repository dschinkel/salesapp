import { renderHook, act } from '@testing-library/react';
import { useVoiceRecorder } from './useVoiceRecorder';

describe('Voice Recorder', () => {
  test('records audio', () => {
    const { result } = renderHook(() => useVoiceRecorder());

    expect(result.current.isRecording).toBe(false);

    act(() => {
      result.current.startRecording();
    });

    expect(result.current.isRecording).toBe(true);

    act(() => {
      result.current.stopRecording();
    });

    expect(result.current.isRecording).toBe(false);
  });

  test('transcribes audio', async () => {
    const fakeRepository = {
      transcribe: async (audio: Blob) => 'Hello World',
    };
    const { result } = renderHook(() => useVoiceRecorder({ transcriptionRepository: fakeRepository }));

    await act(async () => {
      await result.current.transcribeAudio(new Blob(['test'], { type: 'audio/webm' }));
    });

    expect(result.current.transcript).toBe('Hello World');
  });
});
