
import { Task } from '../TaskCard';

export interface TaskOption {
  id: number;
  taskCode: string;
  title: string;
  line: string;
  selected: boolean;
}

export interface TestGeneratorDialogProps {
  tasks: Task[];
}

export interface SavedTest {
  id: string;
  name: string;
  tasks: number[];
  createdAt: string;
  createdBy?: string;
  isPublic?: boolean;
}

export interface SavedTestWithDetails extends SavedTest {
  taskDetails: TaskOption[];
}

export interface TestSolverPageProps {
  testId: string;
}

// Modified UserAnswer to be compatible with statistics-service
export interface UserAnswer {
  taskId: number;
  answer: string;
  isCorrect?: boolean;
  // Adding the following fields to make it compatible with the statistics-service version
  taskCode?: string;
  taskTitle?: string;
  userAnswer?: string;
  correctAnswer?: string;
  points?: number;
  maxPoints?: number;
}

export interface TestGenerationOptions {
  includeExplanations: boolean;
  includeAnswerKey: boolean;
}

// This is a temporary interface to ensure TestSolver.tsx has access to all task properties
export interface ExtendedTask extends Task {
  correctAnswers?: string[];
  explanation?: string;
}

export interface TestResult {
  testId: string;
  userId?: string;
  answers: UserAnswer[];
  score: {
    correct: number;
    total: number;
  };
  completedAt: string;
}
