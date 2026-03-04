import { renderHook, act } from '@testing-library/react';
import { useVoiceRecorder } from './useVoiceRecorder';

class FakeMediaRecorder {
  ondataavailable: ((event: any) => void) | null = null;
  onstop: (() => void) | null = null;
  stream = {
    getTracks: () => [{ stop: () => {} }],
  };
  start() {}
  stop() {
    if (this.onstop) this.onstop();
  }
}

class FakeSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = '';
  onstart: (() => void) | null = null;
  onresult: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onend: (() => void) | null = null;
  start() {
    if (this.onstart) this.onstart();
  }
  stop() {
    if (this.onend) this.onend();
  }
}

beforeAll(() => {
  (global as any).MediaRecorder = FakeMediaRecorder;
  (global as any).navigator.mediaDevices = {
    getUserMedia: async () => ({
      getTracks: () => [{ stop: () => {} }],
    }),
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

  test('increments recording duration', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useVoiceRecorder());

    expect(result.current.recordingDuration).toBe(0);

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.isRecording).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.recordingDuration).toBe(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.recordingDuration).toBe(3);

    act(() => {
      result.current.stopRecording();
    });

    expect(result.current.isRecording).toBe(false);

    // Duration should stay at 3 after stop
    expect(result.current.recordingDuration).toBe(3);

    // Duration should reset on next start
    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.recordingDuration).toBe(0);

    jest.useRealTimers();
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

  test('can toggle transcription converter', () => {
    const { result } = renderHook(() => useVoiceRecorder());

    expect(result.current.transcriptionSource).toBe('gemini');

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    expect(result.current.transcriptionSource).toBe('browser');
  });

  test('transcribes voice using browser', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionInstance: FakeSpeechRecognition | null = null;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      constructor() {
        super();
        recognitionInstance = this;
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    act(() => {
      if (recognitionInstance?.onresult) {
        recognitionInstance.onresult({
          results: [[{ transcript: 'Hello browser' }]],
        });
      }
    });

    expect(result.current.transcript).toBe('Hello browser');
  });

  test('does not use browser transcription when Gemini is selected', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('gemini');
    });

    let started = false;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      start() {
        started = true;
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    expect(started).toBe(false);
  });

  test('sets gemini as transcriber', async () => {
    let transcribed = false;
    const fakeRepository = {
      transcribe: async () => {
        transcribed = true;
        return 'Gemini Result';
      },
    };
    const { result } = renderHook(() => useVoiceRecorder({ transcriptionRepository: fakeRepository as any }));

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    await act(async () => {
      await result.current.transcribeAudio(new Blob(['test'], { type: 'audio/webm' }));
    });

    expect(transcribed).toBe(false);
  });

  test('restarts recording on transient browser error', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let startCount = 0;
    let recognitionInstance: FakeSpeechRecognition | null = null;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      constructor() {
        super();
        recognitionInstance = this;
      }
      start() {
        startCount++;
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    expect(startCount).toBe(1);
    expect(result.current.isRecording).toBe(true);

    // Simulate transient error + end
    act(() => {
      if (recognitionInstance?.onerror) {
        recognitionInstance.onerror({ error: 'no-speech' });
      }
      if (recognitionInstance?.onend) {
        recognitionInstance.onend();
      }
    });

    expect(startCount).toBe(2);
    expect(result.current.isRecording).toBe(true);
  });

  test('stops recording on critical browser error', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionInstance: FakeSpeechRecognition | null = null;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      constructor() {
        super();
        recognitionInstance = this;
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    act(() => {
      if (recognitionInstance?.onerror) {
        recognitionInstance.onerror({ error: 'not-allowed' });
      }
      if (recognitionInstance?.onend) {
        recognitionInstance.onend();
      }
    });

    expect(result.current.isRecording).toBe(false);
  });

  test('captures and exposes transcription errors', async () => {
    const errorRepo = {
      transcribe: async () => {
        throw new Error('Gemini API Quota exceeded. Please try again later.');
      },
    };
    const { result } = renderHook(() => useVoiceRecorder({ transcriptionRepository: errorRepo }));

    await act(async () => {
      await result.current.transcribeAudio(new Blob(['test'], { type: 'audio/webm' }));
    });

    expect(result.current.error).toBe('Gemini API Quota exceeded. Please try again later.');
  });

  test('implements exponential backoff on network error', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionInstance: FakeSpeechRecognition | null = null;
    let startCount = 0;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      constructor() {
        super();
        recognitionInstance = this;
      }
      start() {
        startCount++;
        super.start();
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    expect(startCount).toBe(1);

    // Simulate network error
    act(() => {
      if (recognitionInstance?.onerror) {
        recognitionInstance.onerror({ error: 'network' });
      }
      if (recognitionInstance?.onend) {
        recognitionInstance.onend();
      }
    });

    // Should NOT have restarted immediately
    expect(startCount).toBe(1);

    // Fast-forward 1s
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(startCount).toBe(2);

    // Simulate another network error
    act(() => {
      if (recognitionInstance?.onerror) {
        recognitionInstance.onerror({ error: 'network' });
      }
      if (recognitionInstance?.onend) {
        recognitionInstance.onend();
      }
    });

    // Fast-forward 1s (still shouldn't have restarted as delay is now 2s)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(startCount).toBe(2);

    // Fast-forward another 1s
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(startCount).toBe(3);

    // Reset on success
    act(() => {
      if (recognitionInstance?.onresult) {
        recognitionInstance.onresult({ results: [[{ transcript: 'test' }]] });
      }
    });

    // Simulate network error again
    act(() => {
      if (recognitionInstance?.onerror) {
        recognitionInstance.onerror({ error: 'network' });
      }
      if (recognitionInstance?.onend) {
        recognitionInstance.onend();
      }
    });

    // Should wait only 1s again because it was reset
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(startCount).toBe(4);

    jest.useRealTimers();
  });

  test('calls onTranscriptionComplete once after browser recording stops', async () => {
    const completedTranscripts: string[] = [];
    const onTranscriptionComplete = (t: string) => {
      completedTranscripts.push(t);
    };
    const { result } = renderHook(() => useVoiceRecorder({ onTranscriptionComplete }));

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionInstance: FakeSpeechRecognition | null = null;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      constructor() {
        super();
        recognitionInstance = this;
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    act(() => {
      if (recognitionInstance?.onresult) {
        recognitionInstance.onresult({
          results: [[{ transcript: 'Hello world' }]],
        });
      }
    });

    expect(result.current.transcript).toBe('Hello world');
    expect(completedTranscripts).toEqual([]);

    act(() => {
      result.current.stopRecording();
    });

    expect(completedTranscripts).toEqual(['Hello world']);
  });

  test('stops recording after too many consecutive network errors', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useVoiceRecorder());

    act(() => {
      result.current.setTranscriptionSource('browser');
    });

    let recognitionInstance: FakeSpeechRecognition | null = null;
    (window as any).SpeechRecognition = class extends FakeSpeechRecognition {
      constructor() {
        super();
        recognitionInstance = this;
      }
    };

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.isRecording).toBe(true);

    // Simulate 5 consecutive network errors
    for (let i = 0; i < 5; i++) {
      act(() => {
        if (recognitionInstance?.onerror) {
          recognitionInstance.onerror({ error: 'network' });
        }
        if (recognitionInstance?.onend) {
          recognitionInstance.onend();
        }
      });
      // Fast-forward to the next restart if it hasn't stopped yet
      if (i < 4) {
        act(() => {
          jest.advanceTimersByTime(32000); // More than max backoff to be sure
        });
      }
    }

    expect(result.current.isRecording).toBe(false);

    jest.useRealTimers();
  });
});
