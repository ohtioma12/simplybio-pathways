
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import TestGeneratorDialog from './TestGeneratorDialog';
import { usePermissions } from '@/hooks/use-permissions';
import { Task } from './TaskCard';

interface GenerateTestButtonProps {
  tasks: Task[];
}

const GenerateTestButton: React.FC<GenerateTestButtonProps> = ({ tasks }) => {
  const { isAuthenticated } = usePermissions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center">
          <FileDown className="h-4 w-4" />
          Генерировать вариант
        </Button>
      </DialogTrigger>
      <TestGeneratorDialog tasks={tasks} />
    </Dialog>
  );
};

export default GenerateTestButton;
