
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { TaskOption } from '../types';

interface TaskItemProps {
  task: TaskOption;
  toggleTaskSelection: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskSelection }) => {
  return (
    <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.selected}
        onCheckedChange={() => toggleTaskSelection(task.id)}
      />
      <div className="grid grid-cols-[1fr_auto] gap-x-2 w-full">
        <label
          htmlFor={`task-${task.id}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {task.title}
        </label>
        <div className="flex gap-2">
          <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
            {task.taskCode}
          </span>
          <span className="text-xs bg-slate-100 rounded-full px-2 py-1">
            {task.line}
          </span>
        </div>
        <div className="col-span-2 text-xs text-muted-foreground mt-1">
          Код задания: {task.taskCode}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
