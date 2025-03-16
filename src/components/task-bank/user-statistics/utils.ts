
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
