
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserAnswer } from '@/components/task-bank/user-statistics/statistics-service';
import { TaskOption } from '@/components/task-bank/test-generator/types';
import { Check, X } from 'lucide-react';
import { Task } from '@/components/task-bank/TaskCard';
import { Badge } from '@/components/ui/badge';

interface TestResultsDetailedProps {
  isOpen: boolean;
  onClose: () => void;
  userAnswers: UserAnswer[];
  taskDetails: TaskOption[];
  sampleTasks: Task[];
}

const TestResultsDetailed: React.FC<TestResultsDetailedProps> = ({
  isOpen,
  onClose,
  userAnswers,
  taskDetails,
  sampleTasks
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Подробные результаты</DialogTitle>
          <DialogDescription>
            Детальная информация о ваших ответах и правильных решениях
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[70vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">№</TableHead>
                <TableHead>Код задания</TableHead>
                <TableHead>Ваш ответ</TableHead>
                <TableHead>Правильный ответ</TableHead>
                <TableHead className="w-16 text-center">Результат</TableHead>
                <TableHead className="w-24 text-right">Баллы</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userAnswers.map((answer, index) => {
                const taskOption = taskDetails.find(t => t.id === answer.taskId);
                const task = sampleTasks.find(t => t.id === answer.taskId);
                
                // Get correct answers
                const correctAnswers = task && (task as any).correctAnswers 
                  ? (task as any).correctAnswers 
                  : task?.correctAnswer 
                    ? [task.correctAnswer] 
                    : ['Н/Д'];
                
                // Check if the task has defined points, if not default to 1
                const maxPoints = (task as any)?.points || 1;
                const earnedPoints = answer.isCorrect ? maxPoints : 0;
                
                return (
                  <TableRow key={answer.taskId}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{taskOption?.taskCode || `Задание ${answer.taskId}`}</TableCell>
                    <TableCell>
                      <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {answer.userAnswer || '-'}
                      </span>
                    </TableCell>
                    <TableCell>{correctAnswers.join(' или ')}</TableCell>
                    <TableCell className="text-center">
                      {answer.isCorrect ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          <Check className="h-4 w-4 mr-1" />
                          Верно
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                          <X className="h-4 w-4 mr-1" />
                          Неверно
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {earnedPoints} из {maxPoints}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button>Закрыть</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestResultsDetailed;
