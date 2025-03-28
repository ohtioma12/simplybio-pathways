
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/components/task-bank/TaskCard';
import { Link } from 'react-router-dom';

interface TaskContentProps {
  task: Task;
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  return (
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
              Код: <Link to={`/task/${task.id}`} className="text-blue-600 hover:underline">{task.taskCode || `${task.id}`}</Link>
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
  );
};

export default TaskContent;
