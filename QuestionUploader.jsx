
import React, { useState, useCallback } from 'react';
import { Question } from '../types';
import { SAMPLE_QUESTIONS_JSON } from '../constants';
import Card from './Card';
import Button from './Button';

interface QuestionUploaderProps {
  onStartExam: (questions: Question[]) => void;
}

const QuestionUploader: React.FC<QuestionUploaderProps> = ({ onStartExam }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleJsonInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setError(null);
  };

  const handleStartClick = useCallback(() => {
    if (!jsonInput.trim()) {
      setError('JSON input cannot be empty.');
      return;
    }
    try {
      const parsedQuestions: Question[] = JSON.parse(jsonInput);
      
      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error('JSON must be a non-empty array of questions.');
      }
      
      // Basic validation of question structure
      for (const q of parsedQuestions) {
        if (typeof q.id !== 'number' || typeof q.questionText !== 'string' || !Array.isArray(q.options) || typeof q.correctAnswer !== 'string') {
          throw new Error('Each question object has a missing or invalid property. Required: id (number), questionText (string), options (array), correctAnswer (string).');
        }
      }

      onStartExam(parsedQuestions);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Invalid JSON format: ${e.message}`);
      } else {
        setError('An unknown error occurred while parsing JSON.');
      }
    }
  }, [jsonInput, onStartExam]);
  
  const handleUseSampleData = () => {
    setJsonInput(SAMPLE_QUESTIONS_JSON);
    setError(null);
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Upload Your Questions</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Paste your exam questions as a JSON array in the text area below. Ensure it follows the correct format.
        </p>
        
        <div className="mb-4">
            <button onClick={handleUseSampleData} className="text-sm text-sky-600 dark:text-sky-400 hover:underline">
                Or use sample data to get started
            </button>
        </div>

        <textarea
          className="w-full h-64 p-3 border border-slate-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out font-mono text-sm"
          placeholder="Paste your JSON here..."
          value={jsonInput}
          onChange={handleJsonInputChange}
        />
        
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        
        <div className="mt-6 text-center">
          <Button onClick={handleStartClick} disabled={!jsonInput.trim()}>
            Start Exam
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionUploader;
