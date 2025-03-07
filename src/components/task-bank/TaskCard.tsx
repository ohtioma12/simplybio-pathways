
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import TaskEditDialog from './TaskEditDialog';
import TaskDeleteDialog from './TaskDeleteDialog';
import TaskDetailsDialog from './TaskDetailsDialog';
import TaskCardActions from './TaskCardActions';

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
  correctAnswers?: string[];
  explanation?: string;
  imageUrl?: string;
  score?: number;
}

interface TaskCardProps {
  task: Task;
  index: number;
  onTaskUpdate?: (updatedTask: Task) => void;
  onTaskDelete?: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  index, 
  onTaskUpdate,
  onTaskDelete 
}) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);

  const handleTaskUpdate = (updatedTask: Task) => {
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
      setShowEditDialog(false);
      toast.success('Задание успешно обновлено!');
    }
  };

  const handleDeleteTask = () => {
    if (onTaskDelete) {
      onTaskDelete(task.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className="h-full hover-lift cursor-pointer" 
        onClick={() => setShowTaskDialog(true)}
      >
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
        <CardFooter className="flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{task.topic}</span>
            <TaskCardActions 
              task={task}
              onEditClick={() => setShowEditDialog(true)}
              onDeleteClick={() => setShowDeleteDialog(true)}
              hasDeletePermission={!!onTaskDelete}
            />
          </div>
        </CardFooter>
      </Card>

      {/* Task Details Dialog */}
      <TaskDetailsDialog
        task={task}
        isOpen={showTaskDialog}
        onClose={() => setShowTaskDialog(false)}
      />

      {/* Task Edit Dialog */}
      <TaskEditDialog
        task={task}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={handleTaskUpdate}
      />

      {/* Task Delete Dialog */}
      {onTaskDelete && (
        <TaskDeleteDialog
          task={task}
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onDelete={handleDeleteTask}
        />
      )}
    </motion.div>
  );
};

export default TaskCard;
