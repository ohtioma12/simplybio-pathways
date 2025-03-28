
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { sampleTasks } from '@/components/task-bank/data';
import { Task } from '@/components/task-bank/TaskCard';
import TaskHeader from '@/components/single-task/TaskHeader';
import TaskContent from '@/components/single-task/TaskContent';
import AnswerForm from '@/components/single-task/AnswerForm';

const SingleTaskView = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  
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
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Загрузка задания...</div>;
  }
  
  if (!task) {
    return <div className="container mx-auto px-4 py-8 text-center">Задание не найдено</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskHeader title={task.title} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskContent task={task} />
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ваш ответ</CardTitle>
            </CardHeader>
            <CardContent>
              <AnswerForm task={task} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleTaskView;
