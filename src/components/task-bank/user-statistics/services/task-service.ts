
import { sampleTasks } from '../../data';
import { TaskStatistic } from './types';
import { getUserSolvedTests } from './test-service';

/**
 * Gets task details by ID
 */
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

/**
 * Gets statistics for all tasks attempted by a user
 */
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
