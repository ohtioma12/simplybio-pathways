
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

export interface UserAnswer {
  taskId: number;
  answer: string;
  isCorrect?: boolean;
}

export interface TestGenerationOptions {
  includeExplanations: boolean;
  includeAnswerKey: boolean;
}
