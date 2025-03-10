
import React, { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TestGeneratorDialogProps, TestGenerationOptions } from './test-generator/types';
import { useTestGenerator } from './test-generator/useTestGenerator';
import TestSettingsForm from './test-generator/TestSettingsForm';
import TaskSelectionList from './test-generator/TaskSelectionList';
import { generateTestPdf, saveTestOnline } from './test-generator/pdfGenerator';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const TestGeneratorDialog: React.FC<TestGeneratorDialogProps> = ({ tasks }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pdfOptions, setPdfOptions] = useState<TestGenerationOptions>({
    includeExplanations: false,
    includeAnswerKey: false
  });

  const {
    testName,
    setTestName,
    taskOptions,
    selectedLineFilter,
    setSelectedLineFilter,
    filteredTasks,
    numTasks,
    setNumTasks,
    uniqueLines,
    toggleTaskSelection,
    selectRandomTasks,
    selectedTasksCount
  } = useTestGenerator(tasks);

  const handleGenerateTest = () => {
    const selectedTasks = taskOptions.filter(task => task.selected);
    
    if (selectedTasks.length === 0) {
      toast.error('Выберите хотя бы одно задание для генерации варианта');
      return;
    }
    
    // Save the test online
    const testId = saveTestOnline(testName, selectedTasks, user?.id);
    
    if (testId) {
      toast.success('Вариант создан успешно!', {
        action: {
          label: 'Решать',
          onClick: () => navigate(`/test-solver/${testId}`)
        }
      });
    }
  };

  const handleGeneratePDF = () => {
    const selectedTasks = taskOptions.filter(task => task.selected);
    generateTestPdf(testName, selectedTasks, pdfOptions, tasks);
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle>Генерация варианта ЕГЭ</DialogTitle>
        <DialogDescription>
          Создайте свой вариант из банка заданий для тренировки или проверки знаний
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestSettingsForm
          testName={testName}
          setTestName={setTestName}
          numTasks={numTasks}
          setNumTasks={setNumTasks}
          selectedLineFilter={selectedLineFilter}
          setSelectedLineFilter={setSelectedLineFilter}
          uniqueLines={uniqueLines}
          selectRandomTasks={selectRandomTasks}
          selectedTasksCount={selectedTasksCount}
          maxTasks={tasks.length}
        />
        
        <TaskSelectionList
          filteredTasks={filteredTasks}
          toggleTaskSelection={toggleTaskSelection}
        />
      </div>
      
      <div className="mt-4 space-y-2">
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
      
      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={handleGeneratePDF}>Скачать PDF</Button>
        <Button onClick={handleGenerateTest}>Создать вариант</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TestGeneratorDialog;
