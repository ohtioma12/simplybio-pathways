
import React from 'react';
import { motion } from 'framer-motion';
import TaskCard, { Task } from './TaskCard';
import EmptyState from './EmptyState';
import { usePermissions } from '@/hooks/use-permissions';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate?: (updatedTask: Task) => void;
  onTaskDelete?: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTaskUpdate,
  onTaskDelete
}) => {
  const { canEditTasks, canDeleteTasks } = usePermissions();
  
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {tasks.map((task, index) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          index={index} 
          onTaskUpdate={canEditTasks ? onTaskUpdate : undefined}
          onTaskDelete={canDeleteTasks ? onTaskDelete : undefined}
        />
      ))}
    </motion.div>
  );
};

export default TaskList;
