
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskOption } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  filteredTasks: TaskOption[];
  toggleTaskSelection: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ filteredTasks, toggleTaskSelection }) => {
  return (
    <div>
      <label className="text-sm font-medium">Доступные задания</label>
      <ScrollArea className="h-[34vh] border rounded-md p-2 mt-1">
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleTaskSelection={toggleTaskSelection} 
            />
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              Нет доступных заданий с выбранными фильтрами
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskList;
