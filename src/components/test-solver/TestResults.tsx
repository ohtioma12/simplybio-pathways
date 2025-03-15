
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserAnswer } from '@/components/task-bank/test-generator/types';
import { Check, X } from 'lucide-react';

interface TestResultsProps {
  score: {
    correct: number;
    total: number;
  };
  answers: UserAnswer[];
}

const TestResults: React.FC<TestResultsProps> = ({ score, answers }) => {
  return (
    <div className="space-y-6 mb-6">
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Результаты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Вы ответили правильно на {score.correct} из {score.total} вопросов
              ({Math.round((score.correct / score.total) * 100)}%)
            </p>
            <Progress 
              value={(score.correct / score.total) * 100} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Детали ответов</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Задание</TableHead>
                <TableHead>Ваш ответ</TableHead>
                <TableHead>Результат</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {answers.map((answer) => (
                <TableRow key={answer.taskId}>
                  <TableCell>
                    <div className="font-medium">Задание {answer.taskId}</div>
                    <div className="text-xs text-muted-foreground">{answer.taskCode}</div>
                  </TableCell>
                  <TableCell>{answer.answer || '-'}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResults;
