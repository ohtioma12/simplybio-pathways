
import { SolvedTest } from './statistics-service';

// Helper function to aggregate task statistics with points
export function getTaskStatistics(solvedTests: SolvedTest[]) {
  const taskMap: Record<string, {
    taskId: number;
    taskCode: string;
    taskTitle: string;
    attempts: number;
    earnedPoints: number;
    totalPoints: number;
  }> = {};

  // Collect statistics for each task
  solvedTests.forEach(test => {
    test.answers.forEach(answer => {
      const key = answer.taskId.toString();
      
      if (!taskMap[key]) {
        taskMap[key] = {
          taskId: answer.taskId,
          taskCode: answer.taskCode || `Задание ${answer.taskId}`,
          taskTitle: answer.taskTitle || 'Неизвестное задание',
          attempts: 0,
          earnedPoints: 0,
          totalPoints: 0
        };
      }
      
      taskMap[key].attempts += 1;
      taskMap[key].totalPoints += (answer.maxPoints || 1);
      
      if (answer.isCorrect) {
        taskMap[key].earnedPoints += (answer.points || 1);
      }
    });
  });

  // Convert to array
  return Object.values(taskMap)
    .sort((a, b) => b.attempts - a.attempts);
}

// Calculate overall statistics from solved tests
export function calculateOverallStatistics(solvedTests: SolvedTest[]) {
  const totalPoints = solvedTests.reduce((acc, test) => {
    const earnedPoints = test.answers.reduce((sum, answer) => 
      sum + (answer.isCorrect ? (answer.points || 1) : 0), 0);
    return acc + earnedPoints;
  }, 0);
  
  const totalPossiblePoints = solvedTests.reduce((acc, test) => {
    const possiblePoints = test.answers.reduce((sum, answer) => 
      sum + (answer.maxPoints || 1), 0);
    return acc + possiblePoints;
  }, 0);
  
  const overallPercentage = totalPossiblePoints > 0 
    ? Math.round((totalPoints / totalPossiblePoints) * 100) 
    : 0;

  return {
    totalPoints,
    totalPossiblePoints,
    overallPercentage
  };
}
