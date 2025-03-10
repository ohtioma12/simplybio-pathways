
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft } from 'lucide-react';
import { SavedTest } from '@/components/task-bank/test-generator/types';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface TestHeaderProps {
  test: SavedTest;
  taskCount: number;
  resultsMode: boolean;
  pdfOptions: {
    includeExplanations: boolean;
    includeAnswerKey: boolean;
  };
  setPdfOptions: React.Dispatch<React.SetStateAction<{
    includeExplanations: boolean;
    includeAnswerKey: boolean;
  }>>;
  onGeneratePdf: () => void;
}

const TestHeader: React.FC<TestHeaderProps> = ({ 
  test, 
  taskCount, 
  resultsMode, 
  pdfOptions, 
  setPdfOptions, 
  onGeneratePdf 
}) => {
  const navigate = useNavigate();
  const testDate = new Date(test.createdAt);
  const formattedDate = format(testDate, 'dd MMMM yyyy, HH:mm', { locale: ru });

  return (
    <div className="mb-6">
      <Button variant="outline" onClick={() => navigate('/task-bank')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к банку заданий
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{test.name}</h1>
          <p className="text-muted-foreground">
            Создан: {formattedDate} • {taskCount} заданий
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {!resultsMode && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pdf-explanations"
                  checked={pdfOptions.includeExplanations}
                  onCheckedChange={(checked) => 
                    setPdfOptions(prev => ({ ...prev, includeExplanations: !!checked }))
                  }
                />
                <label htmlFor="pdf-explanations" className="text-sm">Включить пояснения</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pdf-answers"
                  checked={pdfOptions.includeAnswerKey}
                  onCheckedChange={(checked) => 
                    setPdfOptions(prev => ({ ...prev, includeAnswerKey: !!checked }))
                  }
                />
                <label htmlFor="pdf-answers" className="text-sm">Включить ответы</label>
              </div>
            </div>
          )}
          
          <Button onClick={onGeneratePdf} className="whitespace-nowrap">
            <FileDown className="mr-2 h-4 w-4" />
            Скачать PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
