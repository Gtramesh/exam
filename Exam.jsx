
import React, { useState, useCallback } from 'react';
import { Question } from '../types';
import Card from './Card';
import Button from './Button';
import ProgressBar from './ProgressBar';

interface ExamProps {
  questions: Question[];
  onSubmit: (answers: Record<number, string>) => void;
}

const Exam: React.FC<ExamProps> = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const goToNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const goToPrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(() => {
    onSubmit(answers);
  }, [onSubmit, answers]);
  
  return (
    <Card>
      <div className="p-6">
        <ProgressBar progress={progress} />
        <div className="my-6">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
            {currentQuestion.questionText}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                answers[currentQuestion.id] === option
                  ? 'bg-sky-100 border-sky-500 dark:bg-sky-900/50 dark:border-sky-500 ring-2 ring-sky-500'
                  : 'bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-600'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={answers[currentQuestion.id] === option}
                onChange={() => handleAnswerSelect(option)}
                className="sr-only"
              />
              <span className="ml-3 text-slate-700 dark:text-slate-300">{option}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Button onClick={goToPrevious} disabled={currentQuestionIndex === 0} variant="secondary">
            Previous
          </Button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button onClick={handleSubmit} variant="primary">
              Submit Exam
            </Button>
          ) : (
            <Button onClick={goToNext} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Exam;
