
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
import { Lock } from 'lucide-react';
import { Task } from './TaskCard';
import TaskFormFields from './TaskFormFields';
import { useTaskForm } from '@/hooks/use-task-form';
import { toast } from 'sonner';

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
  const [isDialogLocked, setIsDialogLocked] = React.useState(false);
  
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
    if (isDialogLocked) {
      toast.error('Диалог заблокирован. Разблокируйте для сохранения изменений.');
      return;
    }
    onSave(editedTask);
  };

  const toggleLock = () => {
    setIsDialogLocked(!isDialogLocked);
    toast.info(isDialogLocked ? 'Диалог разблокирован' : 'Диалог заблокирован');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Редактировать задание</DialogTitle>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleLock}
            className={isDialogLocked ? "bg-red-100" : ""}
          >
            <Lock className={`h-4 w-4 ${isDialogLocked ? "text-red-500" : ""}`} />
          </Button>
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
            <Button variant="outline" disabled={isDialogLocked}>Отмена</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isDialogLocked}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditDialog;
