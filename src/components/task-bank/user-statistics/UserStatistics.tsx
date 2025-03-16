
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
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getUserSolvedTests, SolvedTest } from './statistics-service';
import { ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  // Calculate overall statistics (now using points)
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Решено вариантов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{solvedTests.length}</div>
            <div className="text-xs text-muted-foreground mt-1">ID пользователя: {userId}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Набрано баллов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints} из {totalPossiblePoints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Средний результат</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints} из {totalPossiblePoints}</div>
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
                <TableHead>Баллы</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solvedTests.map((test) => {
                const earnedPoints = test.answers.reduce((sum, answer) => 
                  sum + (answer.isCorrect ? (answer.points || 1) : 0), 0);
                const totalPoints = test.answers.reduce((sum, answer) => 
                  sum + (answer.maxPoints || 1), 0);
                const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
                
                return (
                  <TableRow key={test.testId}>
                    <TableCell className="font-medium">{test.testName}</TableCell>
                    <TableCell>
                      {format(new Date(test.completedAt), 'dd MMM yyyy', { locale: ru })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{earnedPoints} из {totalPoints}</span>
                        <Progress value={percentage} className="h-2 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link to={`/test-solver/${test.testId}`}>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Просмотр решения
                        </Button>
                      </Link>
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
                <TableHead>Успешность</TableHead>
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
                      <span>{task.earnedPoints} из {task.totalPoints} баллов</span>
                      <Progress value={(task.earnedPoints/task.totalPoints)*100} className="h-2 w-20" />
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

// Helper function to aggregate task statistics with points
function getTaskStatistics(solvedTests: SolvedTest[]) {
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

export default UserStatistics;
