
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
import { Lock } from 'lucide-react';
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
  const [isDialogLocked, setIsDialogLocked] = React.useState(false);
  
  const {
    task: newTask,
    topics,
    filteredSubtopics,
    imagePreview,
    resetForm,
    handleChange,
    handleSelectChange,
    handleImageUpload,
    removeImage,
    addAnswerField,
    removeAnswerField,
    updateAnswer
  } = useTaskForm({
    title: '',
    topic: '',
    subtopic: '',
    line: '',
    part: '',
    difficulty: '',
    description: '',
    correctAnswers: [''],
    explanation: '',
    score: 1,
  } as Task);

  const handleTaskUpload = () => {
    // Validate required fields
    if (!newTask.title || !newTask.topic || !newTask.difficulty || !newTask.description) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Validate that there's at least one correct answer
    if (!newTask.correctAnswers || newTask.correctAnswers.length === 0 || 
        newTask.correctAnswers.every(answer => !answer.trim())) {
      toast.error('Добавьте хотя бы один правильный ответ');
      return;
    }

    // For backward compatibility, set correctAnswer to first item in array
    const taskToSave = {
      ...newTask,
      correctAnswer: newTask.correctAnswers[0]
    };
    
    // Create task and add it
    if (onTaskAdd) {
      onTaskAdd(taskToSave as Task);
      onClose();
      resetForm(newTask);
    } else {
      toast.success('Задание успешно загружено!');
      onClose();
      resetForm(newTask);
    }
  };

  const toggleLock = () => {
    setIsDialogLocked(!isDialogLocked);
    toast.info(isDialogLocked ? 'Диалог разблокирован' : 'Диалог заблокирован');
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader className="flex flex-row items-center justify-between">
        <div>
          <DialogTitle>Загрузить новое задание</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом задании для банка ЕГЭ
          </DialogDescription>
        </div>
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
        task={newTask}
        topics={topics}
        filteredSubtopics={filteredSubtopics}
        imagePreview={imagePreview}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        addAnswerField={addAnswerField}
        removeAnswerField={removeAnswerField}
        updateAnswer={updateAnswer}
      />
      
      <DialogFooter className="sticky bottom-0 bg-background pt-2">
        <DialogClose asChild>
          <Button variant="outline" onClick={() => resetForm(newTask)} disabled={isDialogLocked}>Отмена</Button>
        </DialogClose>
        <Button onClick={handleTaskUpload} disabled={isDialogLocked}>Загрузить</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TaskUploadDialog;
