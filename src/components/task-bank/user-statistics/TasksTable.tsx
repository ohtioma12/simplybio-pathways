
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
import { Link } from 'react-router-dom';
import { TaskStatistic } from './services';

interface TasksTableProps {
  taskStatistics: TaskStatistic[];
}

const TasksTable: React.FC<TasksTableProps> = ({ taskStatistics }) => {
  return (
    <div className="table-responsive">
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Код задания</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Количество попыток</TableHead>
              <TableHead>Успешность</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskStatistics.map((task) => (
              <TableRow key={task.taskId}>
                <TableCell className="font-medium">
                  <Link to={`/task/${task.taskId}`} className="text-blue-600 hover:underline">
                    {task.taskCode}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/task/${task.taskId}`} className="hover:underline">
                    {task.taskTitle}
                  </Link>
                </TableCell>
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
      </ScrollArea>
    </div>
  );
};

export default TasksTable;
