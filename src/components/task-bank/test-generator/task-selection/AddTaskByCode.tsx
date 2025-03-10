
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AddTaskByCodeProps {
  addTaskByCode: (taskCode: string) => void;
}

const AddTaskByCode: React.FC<AddTaskByCodeProps> = ({ addTaskByCode }) => {
  const [taskCode, setTaskCode] = useState('');

  const handleAddTaskByCode = () => {
    if (!taskCode.trim()) {
      toast.error('Введите код задания');
      return;
    }
    
    addTaskByCode(taskCode);
    setTaskCode('');
  };

  return (
    <div className="mb-4">
      <label className="text-sm font-medium">Добавить задание по коду</label>
      <div className="flex gap-2 mt-1">
        <Input
          value={taskCode}
          onChange={(e) => setTaskCode(e.target.value)}
          placeholder="Введите код задания (например, 01-001)"
          className="flex-1"
        />
        <Button onClick={handleAddTaskByCode} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default AddTaskByCode;
