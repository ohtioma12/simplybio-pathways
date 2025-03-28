
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TaskHeaderProps {
  title: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default TaskHeader;
