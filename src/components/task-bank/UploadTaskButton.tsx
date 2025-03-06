
import React, { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import TaskUploadDialog from './TaskUploadDialog';
import TaskUploadCard from './TaskUploadCard';
import { Task } from './TaskCard';

interface UploadTaskButtonProps {
  onTaskAdd?: (newTask: Task) => void;
}

const UploadTaskButton: React.FC<UploadTaskButtonProps> = ({ onTaskAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TaskUploadCard onOpenDialog={() => setIsOpen(true)} />
      </DialogTrigger>
      <TaskUploadDialog 
        onTaskAdd={onTaskAdd}
        onClose={() => setIsOpen(false)}
      />
    </Dialog>
  );
};

export default UploadTaskButton;
