
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
import { getUserSolvedTests, SolvedTest, deleteUserTest } from './statistics-service';
import { ExternalLink, FileText, Trash2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface UserStatisticsProps {
  userId?: string;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ userId }) => {
  const [solvedTests, setSolvedTests] = useState<SolvedTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("tests");

  useEffect(() => {
    if (!userId) return;
    
    loadUserTests();
  }, [userId]);

  const loadUserTests = () => {
    setLoading(true);
    const tests = getUserSolvedTests(userId);
    setSolvedTests(tests);
    setLoading(false);
  };

  const handleDeleteTest = (testId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить результаты этого варианта?')) {
      if (deleteUserTest(testId, userId)) {
        toast.success('Результаты варианта удалены');
        loadUserTests();
      } else {
        toast.error('Ошибка при удалении результатов');
      }
    }
  };

  const getSelectedTest = () => {
    return solvedTests.find(test => test.testId === selectedTestId) || null;
  };

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

  const selectedTest = getSelectedTest();

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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
          <TabsTrigger value="tests">По вариантам</TabsTrigger>
          <TabsTrigger value="tasks">По заданиям</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-[41px] bg-white z-10">
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
                        <div className="flex items-center gap-2">
                          <Link to={`/test-solver/${test.testId}`}>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              Просмотр решения
                            </Button>
                          </Link>
                          
                          <Button 
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleDeleteTest(test.testId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedTestId(test.testId);
                              setShowTestDetails(true);
                            }}
                          >
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-[41px] bg-white z-10">
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
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Test Details Dialog */}
      <Dialog open={showTestDetails} onOpenChange={setShowTestDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTest?.testName || 'Детали решения'}</DialogTitle>
            <DialogDescription>
              Решено: {format(new Date(selectedTest?.completedAt || Date.now()), 'dd MMM yyyy', { locale: ru })}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTest && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Код задания</TableHead>
                  <TableHead>Ваш ответ</TableHead>
                  <TableHead>Правильный ответ</TableHead>
                  <TableHead>Результат</TableHead>
                  <TableHead className="text-right">Баллы</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedTest.answers.map((answer, index) => (
                  <TableRow key={`${answer.taskId}-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{answer.taskCode || `Задание ${answer.taskId}`}</div>
                    </TableCell>
                    <TableCell>{answer.answer || '-'}</TableCell>
                    <TableCell>{answer.correctAnswer || '-'}</TableCell>
                    <TableCell>
                      {answer.isCorrect ? (
                        <span className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Верно
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <X className="h-4 w-4 mr-1" />
                          Неверно
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {answer.isCorrect ? (answer.maxPoints || 1) : 0} / {answer.maxPoints || 1}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
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
