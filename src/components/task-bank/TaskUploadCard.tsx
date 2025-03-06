
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskUploadCardProps {
  onOpenDialog: () => void;
}

const TaskUploadCard: React.FC<TaskUploadCardProps> = ({ onOpenDialog }) => {
  return (
    <div className="glass-card p-5 rounded-xl bg-gradient-to-br from-prosto-blue-light/30 to-transparent">
      <h3 className="font-medium mb-4">Добавить задание</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Загрузите новое задание в банк для ваших учеников
      </p>
      <Button className="w-full" onClick={onOpenDialog}>
        <Plus className="h-4 w-4 mr-2" />
        Загрузить задание
      </Button>
    </div>
  );
};

export default TaskUploadCard;
