import { renderHook, act } from '@testing-library/react';
import { useVoiceRecorder } from './useVoiceRecorder';

beforeAll(() => {
  const mockMediaRecorder = {
    start: jest.fn(),
    stop: jest.fn(function (this: any) {
      if (this.onstop) this.onstop();
    }),
    ondataavailable: null,
    onstop: null,
    stream: {
      getTracks: () => [{ stop: jest.fn() }],
    },
  };

  (global as any).MediaRecorder = jest.fn(() => mockMediaRecorder);
  (global as any).navigator.mediaDevices = {
    getUserMedia: jest.fn().mockResolvedValue({}),
  };
});

describe('Voice Recorder', () => {
  test('records audio', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    expect(result.current.isRecording).toBe(false);

    await act(async () => {
      await result.current.startRecording();
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

  test('can toggle transcription source', () => {
    const { result } = renderHook(() => useVoiceRecorder());

    // Default should be Gemini
    expect(result.current.transcriptionSource).toBe('gemini');

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    expect(result.current.transcriptionSource).toBe('browser');
  });

  test('does not use real-time browser transcription when Gemini is selected', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('gemini');
    });

    // Mock SpeechRecognition
    const mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
    };
    (window as any).SpeechRecognition = jest.fn(() => mockRecognition);

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockRecognition.start).not.toBeCalled();
  });

  test('uses real-time browser transcription when browser is selected', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionResultHandler: any = null;
    const mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      set onresult(handler: any) {
        recognitionResultHandler = handler;
      },
    };
    (window as any).SpeechRecognition = jest.fn(() => mockRecognition);

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockRecognition.start).toHaveBeenCalled();

    act(() => {
      recognitionResultHandler({
        results: [[{ transcript: 'Hello browser' }]],
      });
    });

    expect(result.current.transcript).toBe('Hello browser');
  });

  test('clears transcript when starting new recording', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionResultHandler: any = null;
    const mockRecognition = {
      start: jest.fn(),
      stop: jest.fn(),
      set onresult(handler: any) {
        recognitionResultHandler = handler;
      },
    };
    (window as any).SpeechRecognition = jest.fn(() => mockRecognition);

    await act(async () => {
      await result.current.startRecording();
    });

    act(() => {
      recognitionResultHandler({
        results: [[{ transcript: 'Old transcript' }]],
      });
    });

    expect(result.current.transcript).toBe('Old transcript');

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.transcript).toBe('');
  });
});
