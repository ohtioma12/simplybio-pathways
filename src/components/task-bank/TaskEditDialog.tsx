
import React, { useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from './TaskCard';
import TaskFormFields from './TaskFormFields';
import { useTaskForm } from '@/hooks/use-task-form';

interface TaskEditDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const TaskEditDialog: React.FC<TaskEditDialogProps> = ({ 
  task, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const {
    task: editedTask,
    topics,
    filteredSubtopics,
    imagePreview,
    resetForm,
    handleChange,
    handleSelectChange,
    handleImageUpload,
    removeImage
  } = useTaskForm(task);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      resetForm(task);
    }
  }, [isOpen, task]);

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать задание</DialogTitle>
        </DialogHeader>
        
        <TaskFormFields
          task={editedTask}
          topics={topics}
          filteredSubtopics={filteredSubtopics}
          imagePreview={imagePreview}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
        />
        
        <DialogFooter className="sticky bottom-0 bg-background pt-2">
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditDialog;
