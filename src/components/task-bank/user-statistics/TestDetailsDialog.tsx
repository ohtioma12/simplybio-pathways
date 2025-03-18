import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { SolvedTest } from './services';

interface TestDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTest: SolvedTest | null;
}

const TestDetailsDialog: React.FC<TestDetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedTest
}) => {
  if (!selectedTest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedTest.testName || 'Детали решения'}</DialogTitle>
          <DialogDescription>
            Решено: {format(new Date(selectedTest.completedAt || Date.now()), 'dd MMM yyyy', { locale: ru })}
          </DialogDescription>
        </DialogHeader>
        
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
                  <Link 
                    to={`/task/${answer.taskId}`} 
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => onOpenChange(false)}
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
      </DialogContent>
    </Dialog>
  );
};

export default TestDetailsDialog;
