
import { sampleTasks } from '../data';
import { UserAnswer as TypesUserAnswer } from '../test-generator/types';

// Updated UserAnswer interface to make answer required
export interface UserAnswer {
  taskId: number;
  answer: string; // Now required
  taskCode?: string;
  taskTitle?: string;
  userAnswer?: string;
  correctAnswer?: string;
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

// Updated TaskStatistic interface to match what TasksTable expects
export interface TaskStatistic {
  taskId: number;
  taskCode: string;
  taskTitle: string; // Renamed from title to match expected prop
  attempts: number;
  correctAttempts: number;
  lastAttemptDate: string;
  earnedPoints: number; // Added to match expected prop
  totalPoints: number; // Added to match expected prop
}

// Helper function to convert between UserAnswer formats
export const convertUserAnswer = (answer: TypesUserAnswer): UserAnswer => {
  return {
    taskId: answer.taskId,
    taskCode: answer.taskCode,
    taskTitle: answer.taskTitle,
    userAnswer: answer.userAnswer || answer.answer, // Use answer as fallback
    correctAnswer: answer.correctAnswer || '',
    isCorrect: answer.isCorrect || false,
    points: answer.points,
    maxPoints: answer.maxPoints,
    answer: answer.answer // Ensure this is always included
  };
};

export const saveTestResults = (
  testId: string,
  testName: string,
  answers: any[],
  userId?: string
): void => {
  try {
    // Calculate score
    const score = {
      correct: answers.filter(answer => answer.isCorrect).length,
      total: answers.length
    };

    // Convert answers to the standard format if needed
    const standardizedAnswers = answers.map(answer => {
      // Ensure answer is present
      if (!answer.answer && answer.userAnswer) {
        return {
          ...answer,
          answer: answer.userAnswer
        };
      } else if (!answer.answer) {
        return {
          ...answer,
          answer: '' // Default to empty string if neither is present
        };
      }
      return answer;
    });

    // Create solved test record
    const solvedTest: SolvedTest = {
      testId,
      testName,
      completedAt: new Date().toISOString(),
      answers: standardizedAnswers,
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

export const getUserTaskStatistics = (userId?: string): TaskStatistic[] => {
  try {
    // Get all solved tests for the user
    const userSolvedTests = getUserSolvedTests(userId);
    
    // Create a map to track statistics for each task
    const taskStatsMap = new Map<number, TaskStatistic>();
    
    // Process each test's answers to build task statistics
    userSolvedTests.forEach(test => {
      test.answers.forEach(answer => {
        const taskId = answer.taskId;
        const task = getTaskDetails(taskId);
        
        if (!task) return;
        
        const taskCode = answer.taskCode || task.taskCode || '';
        const taskTitle = task.title || '';
        
        // Calculate earned points and total points for this task
        const earnedPoints = answer.isCorrect ? (answer.points || 1) : 0;
        const totalPoints = answer.maxPoints || 1;
        
        if (!taskStatsMap.has(taskId)) {
          // Initialize task stats if this is the first encounter
          taskStatsMap.set(taskId, {
            taskId,
            taskCode,
            taskTitle,
            attempts: 1,
            correctAttempts: answer.isCorrect ? 1 : 0,
            lastAttemptDate: test.completedAt,
            earnedPoints,
            totalPoints
          });
        } else {
          // Update existing stats
          const existingStats = taskStatsMap.get(taskId)!;
          taskStatsMap.set(taskId, {
            ...existingStats,
            attempts: existingStats.attempts + 1,
            correctAttempts: existingStats.correctAttempts + (answer.isCorrect ? 1 : 0),
            lastAttemptDate: new Date(test.completedAt) > new Date(existingStats.lastAttemptDate) 
              ? test.completedAt 
              : existingStats.lastAttemptDate,
            earnedPoints: existingStats.earnedPoints + earnedPoints,
            totalPoints: existingStats.totalPoints + totalPoints
          });
        }
      });
    });
    
    // Convert map to array and sort by last attempt date (newest first)
    return Array.from(taskStatsMap.values())
      .sort((a, b) => new Date(b.lastAttemptDate).getTime() - new Date(a.lastAttemptDate).getTime());
    
  } catch (error) {
    console.error('Error generating task statistics:', error);
    return [];
  }
};

export const deleteUserTest = (testId: string, userId?: string): boolean => {
  try {
    const userSolvedTestsKey = `user_solved_tests_${userId || 'anonymous'}`;
    const userSolvedTests = JSON.parse(localStorage.getItem(userSolvedTestsKey) || '[]');
    
    const updatedTests = userSolvedTests.filter((test: SolvedTest) => test.testId !== testId);
    
    localStorage.setItem(userSolvedTestsKey, JSON.stringify(updatedTests));
    return true;
  } catch (error) {
    console.error('Error deleting user test:', error);
    return false;
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
