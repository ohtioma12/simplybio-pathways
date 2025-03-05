
import React, { useState } from 'react';
import { BookOpen, CheckCircle, Download, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import TaskEditDialog from './TaskEditDialog';

export interface Task {
  id: number;
  title: string;
  topic: string;
  subtopic?: string;
  line: string;
  part: string;
  difficulty: string;
  description: string;
  correctAnswer?: string;
  imageUrl?: string;
}

interface TaskCardProps {
  task: Task;
  index: number;
  onTaskUpdate?: (updatedTask: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onTaskUpdate }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
    setIsAnswerChecked(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error('Пожалуйста, введите ваш ответ');
      return;
    }

    // Simple string comparison - can be enhanced with more sophisticated matching
    const isCorrect = task.correctAnswer && 
      userAnswer.trim().toLowerCase() === task.correctAnswer.toLowerCase();
    
    setIsAnswerCorrect(isCorrect);
    setIsAnswerChecked(true);
    
    if (isCorrect) {
      toast.success('Правильный ответ!');
    } else {
      toast.error('Неправильный ответ. Попробуйте еще раз.');
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
      setShowEditDialog(false);
      toast.success('Задание успешно обновлено!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full hover-lift">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <CardDescription>
                {task.line} • {task.part}
                {task.subtopic && ` • ${task.subtopic}`}
              </CardDescription>
            </div>
            <div className="text-xs font-medium px-2.5 py-1 bg-prosto-blue-light/50 text-prosto-blue rounded-full">
              {task.difficulty}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
          {task.imageUrl && (
            <div className="mt-3">
              <img 
                src={task.imageUrl} 
                alt={task.title} 
                className="w-full h-auto rounded-md object-cover max-h-32" 
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-xs text-muted-foreground">{task.topic}</span>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowEditDialog(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Открыть
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{task.title}</DialogTitle>
                  <DialogDescription>
                    {task.line} • {task.part} • {task.difficulty}
                  </DialogDescription>
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
                    />
                    
                    {isAnswerChecked && (
                      <div className={`p-3 rounded-md mb-3 ${isAnswerCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                        <p className={`text-sm font-medium ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isAnswerCorrect 
                            ? 'Правильно! Отличная работа.' 
                            : `Неправильно. ${task.correctAnswer ? `Правильный ответ: ${task.correctAnswer}` : 'Попробуйте еще раз.'}`}
                        </p>
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
                      >
                        Очистить
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={checkAnswer}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Проверить
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>

      {/* Task Edit Dialog */}
      <TaskEditDialog
        task={task}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={handleTaskUpdate}
      />
    </motion.div>
  );
};

export default TaskCard;
