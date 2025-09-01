
export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export enum AppScreen {
  UPLOAD = 'UPLOAD',
  EXAM = 'EXAM',
  RESULTS = 'RESULTS',
}
