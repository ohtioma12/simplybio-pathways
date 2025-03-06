
import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Task } from './TaskCard';
import TaskFormFields from './TaskFormFields';
import { useTaskForm } from '@/hooks/use-task-form';

interface TaskUploadDialogProps {
  onTaskAdd?: (newTask: Task) => void;
  onClose: () => void;
}

const TaskUploadDialog: React.FC<TaskUploadDialogProps> = ({ 
  onTaskAdd,
  onClose 
}) => {
  const {
    task: newTask,
    topics,
    filteredSubtopics,
    imagePreview,
    resetForm,
    handleChange,
    handleSelectChange,
    handleImageUpload,
    removeImage
  } = useTaskForm({
    title: '',
    topic: '',
    subtopic: '',
    line: '',
    part: '',
    difficulty: '',
    description: '',
    correctAnswer: '',
  } as Task);

  const handleTaskUpload = () => {
    // Validate required fields
    if (!newTask.title || !newTask.topic || !newTask.difficulty || !newTask.description) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Create task and add it
    if (onTaskAdd) {
      onTaskAdd(newTask as Task);
      onClose();
      resetForm(newTask);
    } else {
      toast.success('Задание успешно загружено!');
      onClose();
      resetForm(newTask);
    }
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Загрузить новое задание</DialogTitle>
        <DialogDescription>
          Заполните информацию о новом задании для банка ЕГЭ
        </DialogDescription>
      </DialogHeader>
      
      <TaskFormFields
        task={newTask}
        topics={topics}
        filteredSubtopics={filteredSubtopics}
        imagePreview={imagePreview}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
      />
      
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onClick={() => resetForm(newTask)}>Отмена</Button>
        </DialogClose>
        <Button onClick={handleTaskUpload}>Загрузить</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TaskUploadDialog;
