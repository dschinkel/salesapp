import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppVersion } from '@/client/components/AppVersion';
import { Questionnaire } from '@/client/components/Questionnaire/Questionnaire.tsx';
import { UploadQuestions } from '@/client/components/UploadQuestions/UploadQuestions.tsx';
import { VoiceRecorder } from '@/client/components/VoiceRecorder/VoiceRecorder.tsx';
import { useQuestions } from '@/client/components/Questionnaire/Questions/useQuestions.ts';
import { useUploadQuestions } from '@/client/components/Questionnaire/useUploadQuestions.ts';
import { parseFile } from '@/client/components/Questionnaire/CSVParser/csvParser.ts';
import { createTranscriptionRepository } from './client/repositories/Transcription/TranscriptionRepository.ts';
import { fetchHttpClient } from './client/data/fetchHttpClient.ts';
import { createTranscriptAnalysisRepository } from './client/repositories/TranscriptAnalysis/TranscriptAnalysisRepository.ts';
import { useTranscriptAnalysis } from '@/client/components/TranscriptAnalysis/useTranscriptAnalysis.ts';
import { Sun, Moon } from 'lucide-react';
import './index.css';

const App = () => {
  const { questions, appendQuestions, reorderQuestion } = useQuestions();
  const { parseAndUploadQuestions } = useUploadQuestions(appendQuestions, {
    parseFile,
  });
  const [isDark, setIsDark] = useState(true);

  const transcriptionRepository = createTranscriptionRepository({ httpClient: fetchHttpClient });
  const analysisRepository = createTranscriptAnalysisRepository({ httpClient: fetchHttpClient });
  const { answeredQuestions, analyzeTranscript } = useTranscriptAnalysis({ analysisRepository });

  const handleTranscriptionComplete = (transcript: string) => {
    analyzeTranscript(transcript, questions);
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-200 ${
        isDark ? 'dark bg-cambria-bg text-cambria-cream' : 'bg-cambria-cream text-cambria-black'
      }`}
    >
      <header className="p-4 flex justify-end">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-cambria-panelLight transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-cambria-gold" /> : <Moon className="w-5 h-5 text-cambria-gold" />}
        </button>
      </header>
      <main className="flex-grow container mx-auto py-4">
        <VoiceRecorder
          transcriptionRepository={transcriptionRepository}
          onTranscriptionComplete={handleTranscriptionComplete}
        />
        <UploadQuestions onUpload={parseAndUploadQuestions} />
        <Questionnaire questions={questions} answeredQuestions={answeredQuestions} onReorder={reorderQuestion} />
      </main>
      <footer className="border-t py-6 md:py-0 transition-colors duration-200 bg-cambria-muted dark:bg-cambria-black border-cambria-mutedDark dark:border-cambria-border">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <AppVersion />
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

export default App;
