
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileCheck } from 'lucide-react';

interface CheckAnswersButtonProps {
  onCheckAnswers: () => void;
  show: boolean;
}

const CheckAnswersButton: React.FC<CheckAnswersButtonProps> = ({ onCheckAnswers, show }) => {
  if (!show) return null;
  
  return (
    <div className="mt-8 flex justify-center">
      <Button 
        size="lg" 
        onClick={onCheckAnswers}
        className="px-8"
      >
        <FileCheck className="mr-2 h-5 w-5" />
        Проверить все ответы
      </Button>
    </div>
  );
};

export default CheckAnswersButton;
