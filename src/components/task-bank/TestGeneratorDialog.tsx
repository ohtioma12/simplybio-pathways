
import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestGeneratorDialogProps } from './test-generator/types';
import { useTestGenerator } from './test-generator/useTestGenerator';
import TestSettingsForm from './test-generator/TestSettingsForm';
import TaskSelectionList from './test-generator/TaskSelectionList';
import { generateTestPdf, saveTestOnline } from './test-generator/pdfGenerator';

const TestGeneratorDialog: React.FC<TestGeneratorDialogProps> = ({ tasks }) => {
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

  const handleGeneratePDF = () => {
    const selectedTasks = taskOptions.filter(task => task.selected);
    
    if (generateTestPdf(testName, selectedTasks)) {
      saveTestOnline(testName, selectedTasks);
    }
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
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Отмена</Button>
        <Button onClick={handleGeneratePDF}>Создать вариант</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TestGeneratorDialog;
