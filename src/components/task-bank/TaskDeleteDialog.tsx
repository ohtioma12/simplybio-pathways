
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Task } from './TaskCard';

interface TaskDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  task: Task;
}

const TaskDeleteDialog: React.FC<TaskDeleteDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  task,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Удаление задания</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить задание "{task.title}"? Это действие невозможно отменить.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDeleteDialog;
