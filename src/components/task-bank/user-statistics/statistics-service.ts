
import { sampleTasks } from '../data';

export interface UserAnswer {
  taskId: number;
  taskCode?: string;
  taskTitle?: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points?: number;
  maxPoints?: number;
}

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

export const saveTestResults = (
  testId: string,
  testName: string,
  answers: UserAnswer[],
  userId?: string
): void => {
  try {
    // Calculate score
    const score = {
      correct: answers.filter(answer => answer.isCorrect).length,
      total: answers.length
    };

    // Create solved test record
    const solvedTest: SolvedTest = {
      testId,
      testName,
      completedAt: new Date().toISOString(),
      answers,
      score
    };

    // Save to localStorage
    const userSolvedTestsKey = `user_solved_tests_${userId || 'anonymous'}`;
    const userSolvedTests = JSON.parse(localStorage.getItem(userSolvedTestsKey) || '[]');
    
    // Check if test already exists - replace it if it does
    const existingIndex = userSolvedTests.findIndex((test: SolvedTest) => test.testId === testId);
    
    if (existingIndex >= 0) {
      userSolvedTests[existingIndex] = solvedTest;
    } else {
      userSolvedTests.push(solvedTest);
    }
    
    localStorage.setItem(userSolvedTestsKey, JSON.stringify(userSolvedTests));
  } catch (error) {
    console.error('Error saving test results:', error);
  }
};

export const getUserSolvedTests = (userId?: string): SolvedTest[] => {
  try {
    const userSolvedTestsKey = `user_solved_tests_${userId || 'anonymous'}`;
    const userSolvedTests = JSON.parse(localStorage.getItem(userSolvedTestsKey) || '[]');
    
    return userSolvedTests.sort((a: SolvedTest, b: SolvedTest) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching user solved tests:', error);
    return [];
  }
};

export const getTaskDetails = (taskId: number) => {
  const task = sampleTasks.find(t => t.id === taskId);
  if (!task) return null;

  // Generate taskCode if needed
  const lineNumber = parseInt(task.line.replace('Линия ', ''), 10) || 0;
  const taskCode = (task as any).taskCode || 
    `${lineNumber.toString().padStart(2, '0')}-${(task.id % 1000).toString().padStart(3, '0')}`;
  
  return {
    ...task,
    taskCode
  };
};
