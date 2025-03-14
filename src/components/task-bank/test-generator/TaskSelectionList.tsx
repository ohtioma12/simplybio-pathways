
import React from 'react';
import { TaskOption } from './types';
import AddTaskByCode from './task-selection/AddTaskByCode';
import TaskList from './task-selection/TaskList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskSelectionListProps {
  filteredTasks: TaskOption[];
  toggleTaskSelection: (id: number) => void;
  allTasks: TaskOption[];
  addTaskByCode: (taskCode: string) => void;
}

const TaskSelectionList: React.FC<TaskSelectionListProps> = ({
  filteredTasks,
  toggleTaskSelection,
  allTasks,
  addTaskByCode,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Выбор заданий</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddTaskByCode addTaskByCode={addTaskByCode} />
        <TaskList 
          filteredTasks={filteredTasks} 
          toggleTaskSelection={toggleTaskSelection} 
        />
      </CardContent>
    </Card>
  );
};

export default TaskSelectionList;
