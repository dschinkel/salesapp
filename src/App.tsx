import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppVersion } from './components/AppVersion';
import { Questionnaire } from './components/Questionnaire.tsx';
import { UploadQuestions } from './components/UploadQuestions/UploadQuestions.tsx';
import { useQuestions } from './components/useQuestions.ts';
import { parseFile } from './components/csvParser.ts';
import { Sun, Moon } from 'lucide-react';
import './index.css';

const App = () => {
  const { questions, parseAndUploadQuestions, draggedIndex, onDragStart, onDragOver, onDragEnd, onDrop } = useQuestions(
    {
      parseFile,
    },
  );
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-cambria-bg text-cambria-cream' : 'bg-slate-50 text-slate-900'}`}
    >
      <header className="p-4 flex justify-end">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-cambria-panelLight transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-cambria-gold" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </header>
      <main className="flex-grow container mx-auto py-4">
        <UploadQuestions onUpload={parseAndUploadQuestions} />
        <Questionnaire
          questions={questions}
          draggedIndex={draggedIndex}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
        />
      </main>
      <footer
        className={`border-t py-6 md:py-0 transition-colors duration-200 ${isDark ? 'bg-cambria-black border-cambria-border' : 'bg-white border-slate-200'}`}
      >
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
