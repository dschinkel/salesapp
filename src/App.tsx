import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppVersion } from './components/AppVersion';
import { QuestionList } from './components/QuestionList';
import { UploadQuestions } from './components/UploadQuestions/UploadQuestions.tsx';
import { useQuestions } from './components/useQuestions.ts';
import { parseFile } from './components/csvParser.ts';
import './index.css';

const App = () => {
  const { questions, parseAndUploadQuestions } = useQuestions({ parseFile });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <main className="flex-grow container mx-auto py-8">
        <UploadQuestions onUpload={parseAndUploadQuestions} />
        <QuestionList questions={questions} />
      </main>
      <footer className="bg-black border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <AppVersion/>
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
