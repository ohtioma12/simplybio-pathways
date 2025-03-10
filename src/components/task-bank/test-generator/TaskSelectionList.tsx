
import React from 'react';
import { TaskOption } from './types';
import AddTaskByCode from './task-selection/AddTaskByCode';
import TaskList from './task-selection/TaskList';

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
    <div>
      <AddTaskByCode addTaskByCode={addTaskByCode} />
      <TaskList 
        filteredTasks={filteredTasks} 
        toggleTaskSelection={toggleTaskSelection} 
      />
    </div>
  );
};

export default TaskSelectionList;
