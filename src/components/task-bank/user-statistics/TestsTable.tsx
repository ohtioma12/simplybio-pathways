
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { FileText, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SolvedTest } from './statistics-service';

interface TestsTableProps {
  solvedTests: SolvedTest[];
  onDeleteTest: (testId: string) => void;
  onViewDetails: (testId: string) => void;
}

const TestsTable: React.FC<TestsTableProps> = ({
  solvedTests,
  onDeleteTest,
  onViewDetails
}) => {
  return (
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
                      onClick={() => onDeleteTest(test.testId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails(test.testId)}
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
  );
};

export default TestsTable;
