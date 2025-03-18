
import { SolvedTest, UserAnswer } from './types';

/**
 * Saves test results to localStorage
 */
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

/**
 * Gets all solved tests for a user
 */
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

/**
 * Deletes a test from user history
 */
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
