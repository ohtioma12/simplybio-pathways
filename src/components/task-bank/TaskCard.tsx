
import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
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
  taskCode?: string;
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
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskCode, setTaskCode] = useState<string>("");

  // Generate task code if it doesn't exist
  useEffect(() => {
    if (!task.taskCode) {
      const lineNumber = parseInt(task.line.replace('Линия ', ''), 10) || 0;
      // Create a unique task code
      const generatedCode = `${lineNumber.toString().padStart(2, '0')}-${(task.id % 1000).toString().padStart(3, '0')}`;
      setTaskCode(generatedCode);
    } else {
      setTaskCode(task.taskCode);
    }
  }, [task]);

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

  const navigateToTask = () => {
    navigate(`/task/${task.id}`);
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
        onClick={navigateToTask}
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
            <div className="flex flex-col gap-1 items-end">
              <div className="text-xs font-medium px-2.5 py-1 bg-prosto-blue-light/50 text-prosto-blue rounded-full">
                {task.difficulty}
              </div>
              <Link 
                to={`/task/${task.id}`} 
                className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-blue-600 hover:bg-slate-200 hover:text-blue-700 rounded-full transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Код: {taskCode}
              </Link>
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
              onEditClick={(e) => {
                e.stopPropagation();
                setShowEditDialog(true);
              }}
              onDeleteClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              hasDeletePermission={!!onTaskDelete}
            />
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
