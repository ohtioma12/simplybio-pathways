
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
      className="h-full"
    >
      <Card 
        className="h-full hover-lift cursor-pointer shadow-md hover:shadow-lg transition-all" 
        onClick={() => setShowTaskDialog(true)}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{task.title}</CardTitle>
              <CardDescription className="mt-1">
                {task.line} • {task.part}
                {task.subtopic && ` • ${task.subtopic}`}
              </CardDescription>
            </div>
            <div className="text-xs font-medium px-2.5 py-1 bg-prosto-blue-light/50 text-prosto-blue rounded-full">
              {task.difficulty}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-sm text-muted-foreground line-clamp-4 min-h-[5rem]">{task.description}</p>
          {task.imageUrl && (
            <div className="mt-4">
              <img 
                src={task.imageUrl} 
                alt={task.title} 
                className="w-full h-auto rounded-md object-cover max-h-40" 
              />
            </div>
          )}
          {task.score && (
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium px-2 py-0.5 bg-muted rounded-md">
                Баллов: {task.score}
              </span>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{task.topic}</span>
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
