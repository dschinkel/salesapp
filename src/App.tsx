import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppVersion } from './components/AppVersion';
import { QuestionList } from './components/QuestionList';
import { QuestionUpload } from './components/QuestionUpload';
import './index.css';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <main className="flex-grow container mx-auto py-8">
        <QuestionUpload />
        <QuestionList />
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
