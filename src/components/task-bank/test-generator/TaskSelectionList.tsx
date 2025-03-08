
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskOption } from './types';

interface TaskSelectionListProps {
  filteredTasks: TaskOption[];
  toggleTaskSelection: (id: number) => void;
}

const TaskSelectionList: React.FC<TaskSelectionListProps> = ({
  filteredTasks,
  toggleTaskSelection,
}) => {
  return (
    <div>
      <label className="text-sm font-medium">Доступные задания</label>
      <ScrollArea className="h-[40vh] border rounded-md p-2 mt-1">
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
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

export default TaskSelectionList;
