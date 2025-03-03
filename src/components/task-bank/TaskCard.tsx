
import React from 'react';
import { BookOpen, Download } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';

export interface Task {
  id: number;
  title: string;
  topic: string;
  line: string;
  part: string;
  difficulty: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
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
              <CardDescription>{task.line} • {task.part}</CardDescription>
            </div>
            <div className="text-xs font-medium px-2.5 py-1 bg-prosto-blue-light/50 text-prosto-blue rounded-full">
              {task.difficulty}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-xs text-muted-foreground">{task.topic}</span>
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
                  <p className="text-sm text-muted-foreground">{task.topic}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Содержание задания</h4>
                  <p className="text-sm">{task.description}</p>
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
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
