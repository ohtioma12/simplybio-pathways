
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TaskStatistic } from './services';
import { useIsMobile } from '@/hooks/use-mobile';

interface TasksTableProps {
  taskStatistics: TaskStatistic[];
}

const TasksTable: React.FC<TasksTableProps> = ({ taskStatistics }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="table-responsive">
      <ScrollArea className="h-[300px] md:h-[400px]">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-[120px]">Код задания</TableHead>
              <TableHead>Название</TableHead>
              {!isMobile && <TableHead>Количество попыток</TableHead>}
              <TableHead>Успешность</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskStatistics.map((task) => (
              <TableRow key={task.taskId}>
                <TableCell className="font-medium">
                  <Link 
                    to={`/task/${task.taskId}`} 
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    {task.taskCode}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/task/${task.taskId}`} 
                    className="font-medium hover:text-blue-600 hover:underline transition-colors line-clamp-2 md:line-clamp-1"
                  >
                    {task.taskTitle}
                  </Link>
                </TableCell>
                {!isMobile && <TableCell>{task.attempts}</TableCell>}
                <TableCell>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-sm whitespace-nowrap">{task.earnedPoints} / {task.totalPoints}</span>
                    <Progress 
                      value={(task.earnedPoints/task.totalPoints)*100} 
                      className="h-2 w-16 sm:w-20" 
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default TasksTable;
