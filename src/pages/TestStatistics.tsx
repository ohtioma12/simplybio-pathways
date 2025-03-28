
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/auth/AuthContext';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getUserSolvedTests, SolvedTest } from '@/components/task-bank/user-statistics/services';
import { toast } from 'sonner';

const TestStatistics = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState<SolvedTest | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!testId || !user) {
      navigate('/profile');
      return;
    }
    
    // Load test data
    const tests = getUserSolvedTests(user.id);
    const foundTest = tests.find(t => t.testId === testId);
    
    if (foundTest) {
      setTest(foundTest);
    } else {
      toast.error('Тест не найден');
      navigate('/profile');
    }
    
    setLoading(false);
  }, [testId, user, navigate]);
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Загрузка статистики...</div>;
  }
  
  if (!test) {
    return <div className="container mx-auto px-4 py-8 text-center">Статистика не найдена</div>;
  }
  
  // Calculate total points
  const totalEarnedPoints = test.answers.reduce((total, answer) => {
    return total + (answer.isCorrect ? (answer.maxPoints || 1) : 0);
  }, 0);
  
  const totalPossiblePoints = test.answers.reduce((total, answer) => {
    return total + (answer.maxPoints || 1);
  }, 0);
  
  // Calculate percentage for progress bar
  const progressPercentage = totalPossiblePoints > 0 
    ? (totalEarnedPoints / totalPossiblePoints) * 100 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/profile')} className="mr-0 sm:mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Назад к профилю</span>
          <span className="sm:hidden">Назад</span>
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold">{test.testName}</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Общая информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Дата решения</p>
              <p className="font-medium">
                {format(new Date(test.completedAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Результат</p>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-medium">{totalEarnedPoints} из {totalPossiblePoints} баллов</p>
                <Progress value={progressPercentage} className="h-2 w-24" />
                <p className="text-sm font-medium">{Math.round(progressPercentage)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Результаты по заданиям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-responsive">
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
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
                  {test.answers.map((answer, index) => (
                    <TableRow key={`${answer.taskId}-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link 
                          to={`/task/${answer.taskId}`} 
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {answer.taskCode || `Задание ${answer.taskId}`}
                        </Link>
                      </TableCell>
                      <TableCell>{answer.answer || '-'}</TableCell>
                      <TableCell>{answer.correctAnswer || '-'}</TableCell>
                      <TableCell>
                        {answer.isCorrect ? (
                          <span className="flex items-center text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Верно</span>
                            <span className="sm:hidden">✓</span>
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <X className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Неверно</span>
                            <span className="sm:hidden">✗</span>
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
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestStatistics;
