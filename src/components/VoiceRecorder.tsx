import React from 'react';
import { Mic, StopCircle } from 'lucide-react';
import { useVoiceRecorder, TranscriptionRepository } from './useVoiceRecorder';
import { Settings, BrainCircuit, Globe } from 'lucide-react';

export function VoiceRecorder({ transcriptionRepository }: { transcriptionRepository?: TranscriptionRepository }) {
  const { isRecording, transcript, transcriptionSource, setTranscriptionSource, startRecording, stopRecording } =
    useVoiceRecorder({ transcriptionRepository });

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 flex flex-col shadow-lg rounded-xl overflow-hidden border border-slate-200 dark:border-cambria-border transition-colors duration-200">
      <HeaderControls
        isRecording={isRecording}
        onStart={startRecording}
        onStop={stopRecording}
        transcriptionSource={transcriptionSource}
        onSourceChange={setTranscriptionSource}
      />
      <TranscriptArea transcript={transcript} />
    </div>
  );
}

function HeaderControls({
  isRecording,
  onStart,
  onStop,
  transcriptionSource,
  onSourceChange,
}: {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  transcriptionSource: 'gemini' | 'browser';
  onSourceChange: (source: 'gemini' | 'browser') => void;
}) {
  return (
    <div className="bg-[#D2B591] dark:bg-[#C5A55A] px-6 py-3 flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="w-1/3 flex justify-start">
          <RecordingStatus isRecording={isRecording} />
        </div>
        <div className="w-1/3 flex justify-center">
          <RecordingButton isRecording={isRecording} onClick={isRecording ? onStop : onStart} />
        </div>
        <div className="w-1/3 flex justify-end">
          <RecordingDuration />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-1">
        <button
          onClick={() => onSourceChange('gemini')}
          disabled={isRecording}
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded transition-colors ${
            transcriptionSource === 'gemini'
              ? 'bg-white text-cambria-gold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          } ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <BrainCircuit className="w-3 h-3" />
          GEMINI
        </button>
        <button
          onClick={() => onSourceChange('browser')}
          disabled={isRecording}
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded transition-colors ${
            transcriptionSource === 'browser'
              ? 'bg-white text-cambria-gold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          } ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Globe className="w-3 h-3" />
          BROWSER
        </button>
      </div>
    </div>
  );
}

function RecordingStatus({ isRecording }: { isRecording: boolean }) {
  return (
    <div className="text-white font-semibold flex items-center gap-2">
      <RecordingIndicator isRecording={isRecording} />
    </div>
  );
}

function RecordingIndicator({ isRecording }: { isRecording: boolean }) {
  if (!isRecording) return <span>Ready</span>;
  return (
    <>
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
      Recording...
    </>
  );
}

function RecordingDuration() {
  return <div className="text-white font-mono text-xl tracking-wider">00:00:00</div>;
}

function RecordingButton({ isRecording, onClick }: { isRecording: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
    >
      <RecordingIcon isRecording={isRecording} />
    </button>
  );
}

function RecordingIcon({ isRecording }: { isRecording: boolean }) {
  if (isRecording) return <StopCircle className="w-5 h-5 text-red-500" />;
  return <Mic className="w-5 h-5 text-[#3B82F6]" />;
}

function TranscriptArea({ transcript }: { transcript: string }) {
  return (
    <div className="bg-white dark:bg-cambria-panelDark p-6 min-h-[150px] transition-colors duration-200 text-slate-800 dark:text-cambria-cream">
      <TranscriptText transcript={transcript} />
      <EmptyTranscriptPrompt transcript={transcript} />
    </div>
  );
}

function TranscriptText({ transcript }: { transcript: string }) {
  if (!transcript) return null;
  return <p className="whitespace-pre-wrap">{transcript}</p>;
}

function EmptyTranscriptPrompt({ transcript }: { transcript: string }) {
  if (transcript) return null;
  return (
    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-cambria-mutedDarker h-full py-8 gap-3">
      <Mic className="w-10 h-10 opacity-30" />
      <p className="text-sm font-medium">Press the microphone to start recording...</p>
    </div>
  );
}
