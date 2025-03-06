
import { useState } from 'react';
import { Task } from '@/components/task-bank/TaskCard';
import { toast } from 'sonner';

export const useTaskManagement = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Handle task update
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast.success('Задание успешно обновлено!');
  };

  // Handle new task addition
  const handleNewTask = (newTask: Task) => {
    // Generate a new unique ID
    const newId = Math.max(...tasks.map(task => task.id), 0) + 1;
    const taskWithId = { ...newTask, id: newId };
    
    setTasks(prevTasks => [...prevTasks, taskWithId]);
    toast.success('Новое задание добавлено!');
  };

  // Handle task deletion
  const handleTaskDelete = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast.success('Задание успешно удалено!');
  };

  return {
    tasks,
    setTasks,
    handleTaskUpdate,
    handleNewTask,
    handleTaskDelete
  };
};
