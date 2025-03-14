
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface PdfOptionsProps {
  pdfOptions: {
    includeExplanations: boolean;
    includeAnswerKey: boolean;
  };
  setPdfOptions: React.Dispatch<React.SetStateAction<{
    includeExplanations: boolean;
    includeAnswerKey: boolean;
  }>>;
}

const PdfOptionsSection: React.FC<PdfOptionsProps> = ({ pdfOptions, setPdfOptions }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="include-explanations"
          checked={pdfOptions.includeExplanations}
          onCheckedChange={(checked) => 
            setPdfOptions(prev => ({ ...prev, includeExplanations: !!checked }))
          }
        />
        <label 
          htmlFor="include-explanations" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Добавить пояснения к заданиям в PDF
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="include-answer-key"
          checked={pdfOptions.includeAnswerKey}
          onCheckedChange={(checked) => 
            setPdfOptions(prev => ({ ...prev, includeAnswerKey: !!checked }))
          }
        />
        <label 
          htmlFor="include-answer-key" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Добавить ключи с ответами в PDF
        </label>
      </div>
    </div>
  );
};

export default PdfOptionsSection;
