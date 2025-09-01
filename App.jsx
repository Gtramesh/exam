
import React, { useState, useCallback } from 'react';
import { Question, AppScreen } from './types';
import QuestionUploader from './components/QuestionUploader';
import Exam from './components/Exam';
import Results from './components/Results';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.UPLOAD);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const handleStartExam = useCallback((loadedQuestions: Question[]) => {
    setQuestions(loadedQuestions);
    setUserAnswers({});
    setScreen(AppScreen.EXAM);
  }, []);

  const handleSubmitExam = useCallback((finalAnswers: Record<number, string>) => {
    setUserAnswers(finalAnswers);
    setScreen(AppScreen.RESULTS);
  }, []);

  const handleRestart = useCallback(() => {
    setQuestions([]);
    setUserAnswers({});
    setScreen(AppScreen.UPLOAD);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.EXAM:
        return <Exam questions={questions} onSubmit={handleSubmitExam} />;
      case AppScreen.RESULTS:
        return <Results questions={questions} userAnswers={userAnswers} onRestart={handleRestart} />;
      case AppScreen.UPLOAD:
      default:
        return <QuestionUploader onStartExam={handleStartExam} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
          Online Exam Builder
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Create, take, and review your custom exams instantly.
        </p>
      </header>
      <main className="w-full flex justify-center">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
