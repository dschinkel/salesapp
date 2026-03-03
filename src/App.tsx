import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppVersion } from './components/AppVersion';
import { Questionnaire } from './components/Questionnaire.tsx';
import { UploadQuestions } from './components/UploadQuestions/UploadQuestions.tsx';
import { VoiceRecorder } from './components/VoiceRecorder.tsx';
import { useQuestions } from './components/useQuestions.ts';
import { useUploadQuestions } from './components/useUploadQuestions.ts';
import { parseFile } from './components/csvParser.ts';
import { createTranscriptionRepository } from './client/repositories/TranscriptionRepository.ts';
import { fetchHttpClient } from './client/data/fetchHttpClient.ts';
import { Sun, Moon } from 'lucide-react';
import './index.css';

const App = () => {
  const { questions, appendQuestions, reorderQuestion } = useQuestions();
  const { parseAndUploadQuestions } = useUploadQuestions(appendQuestions, {
    parseFile,
  });
  const [isDark, setIsDark] = useState(true);

  const transcriptionRepository = createTranscriptionRepository({ httpClient: fetchHttpClient });

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
        <VoiceRecorder transcriptionRepository={transcriptionRepository} />
        <UploadQuestions onUpload={parseAndUploadQuestions} />
        <Questionnaire questions={questions} onReorder={reorderQuestion} />
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
