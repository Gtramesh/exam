
import React, { useMemo } from 'react';
import { Question } from '../types';
import Card from './Card';
import Button from './Button';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface ResultsProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, onRestart }) => {
  const score = useMemo(() => {
    return questions.reduce((acc, question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [questions, userAnswers]);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <Card>
      <div className="p-6">
        <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Exam Results</h2>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            You scored
          </p>
          <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 my-2">
            {score} / {questions.length}
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mt-4">
            <div
              className="bg-gradient-to-r from-sky-500 to-indigo-500 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">Answer Breakdown</h3>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <div key={question.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{index + 1}. {question.questionText}</p>
                <div className={`mt-2 flex items-center p-2 rounded-md text-sm ${
                  isCorrect 
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300'
                }`}>
                  {isCorrect ? <CheckIcon className="w-5 h-5 mr-2" /> : <XIcon className="w-5 h-5 mr-2" />}
                  Your answer: <span className="font-semibold ml-1">{userAnswer || 'Not answered'}</span>
                </div>
                {!isCorrect && (
                  <div className="mt-1 flex items-center p-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400">
                    <span className="font-semibold mr-1">Correct answer:</span> {question.correctAnswer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={onRestart}>
            Take Another Exam
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Results;
