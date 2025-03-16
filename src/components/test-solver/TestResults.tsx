
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
  // Calculate total points
  const totalEarnedPoints = answers.reduce((total, answer) => {
    return total + (answer.isCorrect ? (answer.maxPoints || 1) : 0);
  }, 0);
  
  const totalPossiblePoints = answers.reduce((total, answer) => {
    return total + (answer.maxPoints || 1);
  }, 0);
  
  // Calculate percentage for progress bar
  const progressPercentage = totalPossiblePoints > 0 
    ? (totalEarnedPoints / totalPossiblePoints) * 100 
    : 0;
  
  return (
    <div className="space-y-6 mb-6">
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Результаты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Вы набрали {totalEarnedPoints} из {totalPossiblePoints} баллов
            </p>
            <Progress 
              value={progressPercentage} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Детальные результаты</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
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
              {answers.map((answer, index) => (
                <TableRow key={answer.taskId}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResults;
