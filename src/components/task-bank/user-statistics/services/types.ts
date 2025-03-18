
import { UserAnswer as TypesUserAnswer } from '../../test-generator/types';

// User answer interface
export interface UserAnswer {
  taskId: number;
  answer: string;
  taskCode?: string;
  taskTitle?: string;
  userAnswer?: string;
  correctAnswer?: string;
  isCorrect: boolean;
  points?: number;
  maxPoints?: number;
}

// Solved test interface
export interface SolvedTest {
  testId: string;
  testName: string;
  completedAt: string;
  answers: UserAnswer[];
  score: {
    correct: number;
    total: number;
  };
}

// Task statistics interface
export interface TaskStatistic {
  taskId: number;
  taskCode: string;
  taskTitle: string;
  attempts: number;
  correctAttempts: number;
  lastAttemptDate: string;
  earnedPoints: number;
  totalPoints: number;
}

// Helper function to convert between UserAnswer formats
export const convertUserAnswer = (answer: TypesUserAnswer): UserAnswer => {
  return {
    taskId: answer.taskId,
    taskCode: answer.taskCode,
    taskTitle: answer.taskTitle,
    userAnswer: answer.userAnswer || answer.answer,
    correctAnswer: answer.correctAnswer || '',
    isCorrect: answer.isCorrect || false,
    points: answer.points,
    maxPoints: answer.maxPoints,
    answer: answer.answer
  };
};
