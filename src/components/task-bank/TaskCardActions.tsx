
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from './TaskCard';

interface TaskCardActionsProps {
  task: Task;
  onEditClick: () => void;
  onDeleteClick: () => void;
  hasDeletePermission: boolean;
}

const TaskCardActions: React.FC<TaskCardActionsProps> = ({ 
  task, 
  onEditClick, 
  onDeleteClick,
  hasDeletePermission
}) => {
  return (
    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
      {hasDeletePermission && (
        <Button 
          variant="ghost" 
          size="sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onDeleteClick}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onEditClick}
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskCardActions;
