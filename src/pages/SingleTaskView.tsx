
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { sampleTasks } from '@/components/task-bank/data';
import { Task } from '@/components/task-bank/TaskCard';

const SingleTaskView = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  
  useEffect(() => {
    if (!taskId) {
      navigate('/task-bank');
      return;
    }
    
    // Load task data
    const foundTask = sampleTasks.find(t => t.id === parseInt(taskId, 10));
    if (foundTask) {
      setTask(foundTask);
    } else {
      toast.error('Задание не найдено');
      navigate('/task-bank');
    }
    
    setLoading(false);
  }, [taskId, navigate]);
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
    setIsAnswerChecked(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error('Пожалуйста, введите ваш ответ');
      return;
    }

    if (!task?.correctAnswers) {
      toast.error('Ошибка: для данного задания не указаны правильные ответы');
      return;
    }

    // Check if answer is correct using the array of correct answers
    const isCorrect = task.correctAnswers.some(
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
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Загрузка задания...</div>;
  }
  
  if (!task) {
    return <div className="container mx-auto px-4 py-8 text-center">Задание не найдено</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>
                    {task.line} • {task.part}
                    {task.subtopic && ` • ${task.subtopic}`}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <div className="text-xs font-medium px-2.5 py-1 bg-prosto-blue-light/50 text-prosto-blue rounded-full">
                    {task.difficulty}
                  </div>
                  <div className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    Код: {task.taskCode || `${task.id}`}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ваш ответ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                >
                  Очистить
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={checkAnswer}
                >
                  Проверить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleTaskView;
