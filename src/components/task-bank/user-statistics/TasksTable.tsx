
import React from 'react';
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

interface TasksTableProps {
  taskStatistics: Array<{
    taskId: number;
    taskCode: string;
    taskTitle: string;
    attempts: number;
    earnedPoints: number;
    totalPoints: number;
  }>;
}

const TasksTable: React.FC<TasksTableProps> = ({ taskStatistics }) => {
  return (
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
          {taskStatistics.map((task) => (
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
  );
};

export default TasksTable;
