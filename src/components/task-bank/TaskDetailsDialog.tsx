
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Task } from './TaskCard';

interface TaskDetailsDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({ 
  task, 
  isOpen, 
  onClose 
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isDialogLocked, setIsDialogLocked] = useState(false);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
    setIsAnswerChecked(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error('Пожалуйста, введите ваш ответ');
      return;
    }

    // Check if answer is correct using the array of correct answers
    const isCorrect = task.correctAnswers?.some(
      answer => userAnswer.trim().toLowerCase() === answer.toLowerCase()
    ) || false;
    
    setIsAnswerCorrect(isCorrect);
    setIsAnswerChecked(true);
    
    if (isCorrect) {
      toast.success('Правильный ответ!');
    } else {
      toast.error('Неправильный ответ. Попробуйте еще раз.');
    }
  };

  const toggleLock = () => {
    setIsDialogLocked(!isDialogLocked);
    toast.info(isDialogLocked ? 'Диалог разблокирован' : 'Диалог заблокирован');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription>
              {task.line} • {task.part} • {task.difficulty}
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
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Тема</h4>
            <p className="text-sm text-muted-foreground">
              {task.topic}
              {task.subtopic && ` > ${task.subtopic}`}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Содержание задания</h4>
            <p className="text-sm">{task.description}</p>
            {task.imageUrl && (
              <div className="mt-3">
                <img 
                  src={task.imageUrl} 
                  alt={task.title} 
                  className="w-full h-auto rounded-md object-cover max-h-64" 
                />
              </div>
            )}
          </div>
          
          {/* Answer interface */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium mb-2">Ваш ответ</h4>
            <Textarea 
              placeholder="Введите ваш ответ здесь..."
              className="mb-3"
              value={userAnswer}
              onChange={handleAnswerChange}
              disabled={isDialogLocked}
            />
            
            {isAnswerChecked && (
              <div className={`p-3 rounded-md mb-3 ${isAnswerCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-sm font-medium ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isAnswerCorrect 
                    ? 'Правильно! Отличная работа.' 
                    : `Неправильно. Попробуйте еще раз.`}
                </p>
              </div>
            )}
            
            {/* Correct answer section */}
            {isAnswerChecked && !isAnswerCorrect && task.correctAnswers && (
              <div className="p-3 rounded-md mb-3 bg-blue-50">
                <h5 className="text-sm font-medium text-blue-700 mb-1">Правильный ответ:</h5>
                <p className="text-sm text-blue-800">{task.correctAnswers[0]}</p>
              </div>
            )}
            
            {/* Explanation section */}
            {isAnswerChecked && task.explanation && (
              <div className="p-3 rounded-md mb-3 bg-purple-50">
                <h5 className="text-sm font-medium text-purple-700 mb-1">Объяснение:</h5>
                <p className="text-sm text-purple-800">{task.explanation}</p>
              </div>
            )}
            
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setUserAnswer('');
                  setIsAnswerChecked(false);
                }}
                disabled={isDialogLocked}
              >
                Очистить
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={checkAnswer}
                disabled={isDialogLocked}
              >
                Проверить
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;
