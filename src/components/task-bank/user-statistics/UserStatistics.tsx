
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getUserSolvedTests, SolvedTest } from './statistics-service';

interface UserStatisticsProps {
  userId?: string;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ userId }) => {
  const [solvedTests, setSolvedTests] = useState<SolvedTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    const tests = getUserSolvedTests(userId);
    setSolvedTests(tests);
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <div className="py-8 text-center">Загрузка статистики...</div>;
  }

  if (solvedTests.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">У вас пока нет решенных вариантов</p>
      </div>
    );
  }

  // Calculate overall statistics
  const totalAnswered = solvedTests.reduce((acc, test) => acc + test.answers.length, 0);
  const totalCorrect = solvedTests.reduce(
    (acc, test) => acc + test.answers.filter(a => a.isCorrect).length, 
    0
  );
  const overallPercentage = totalAnswered > 0 
    ? Math.round((totalCorrect / totalAnswered) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Решено вариантов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{solvedTests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Решено заданий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAnswered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallPercentage}%</div>
            <Progress value={overallPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tests">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tests">По вариантам</TabsTrigger>
          <TabsTrigger value="tasks">По заданиям</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название варианта</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Правильно</TableHead>
                <TableHead>Результат</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solvedTests.map((test) => {
                const correctCount = test.answers.filter(a => a.isCorrect).length;
                const totalCount = test.answers.length;
                const percentage = Math.round((correctCount / totalCount) * 100);
                
                return (
                  <TableRow key={test.testId}>
                    <TableCell className="font-medium">{test.testName}</TableCell>
                    <TableCell>
                      {format(new Date(test.completedAt), 'dd MMM yyyy', { locale: ru })}
                    </TableCell>
                    <TableCell>{correctCount} из {totalCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{percentage}%</span>
                        <Progress value={percentage} className="h-2 w-20" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Код задания</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Количество попыток</TableHead>
                <TableHead>Результат</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getTaskStatistics(solvedTests).map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell className="font-medium">{task.taskCode}</TableCell>
                  <TableCell>{task.taskTitle}</TableCell>
                  <TableCell>{task.attempts}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{task.successRate}%</span>
                      <Progress value={task.successRate} className="h-2 w-20" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to aggregate task statistics
function getTaskStatistics(solvedTests: SolvedTest[]) {
  const taskMap: Record<string, {
    taskId: number;
    taskCode: string;
    taskTitle: string;
    attempts: number;
    correct: number;
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
          correct: 0
        };
      }
      
      taskMap[key].attempts += 1;
      if (answer.isCorrect) {
        taskMap[key].correct += 1;
      }
    });
  });

  // Convert to array and calculate success rate
  return Object.values(taskMap)
    .map(task => ({
      ...task,
      successRate: Math.round((task.correct / task.attempts) * 100)
    }))
    .sort((a, b) => b.attempts - a.attempts);
}

export default UserStatistics;
