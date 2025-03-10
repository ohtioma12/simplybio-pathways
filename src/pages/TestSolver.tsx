
import React from 'react';
import { useParams } from 'react-router-dom';
import { generateTestPdf } from '@/components/task-bank/test-generator/pdfGenerator';
import { ExtendedTask } from '@/components/task-bank/test-generator/types';
import { sampleTasks } from '@/components/task-bank/data';
import { useTestSolver } from '@/hooks/use-test-solver';
import TestHeader from '@/components/test-solver/TestHeader';
import TestResults from '@/components/test-solver/TestResults';
import TaskItem from '@/components/test-solver/TaskItem';
import CheckAnswersButton from '@/components/test-solver/CheckAnswersButton';

const TestSolver: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  
  const {
    test,
    taskDetails,
    userAnswers,
    pdfOptions,
    setPdfOptions,
    resultsMode,
    score,
    handleAnswerChange,
    checkAllAnswers
  } = useTestSolver(testId);
  
  const handleGeneratePdf = () => {
    if (!test || taskDetails.length === 0) return;
    
    generateTestPdf(
      test.name, 
      taskDetails, 
      pdfOptions,
      sampleTasks
    );
  };
  
  if (!test || taskDetails.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Загрузка варианта...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <TestHeader 
        test={test}
        taskCount={taskDetails.length}
        resultsMode={resultsMode}
        pdfOptions={pdfOptions}
        setPdfOptions={setPdfOptions}
        onGeneratePdf={handleGeneratePdf}
      />
      
      {resultsMode && <TestResults score={score} />}
      
      <div className="space-y-6">
        {taskDetails.map((task, index) => {
          const fullTask = sampleTasks.find(t => t.id === task.id) as ExtendedTask | undefined;
          if (!fullTask) return null;
          
          const userAnswer = userAnswers.find(a => a.taskId === task.id);
          
          return (
            <TaskItem
              key={task.id}
              task={task}
              fullTask={fullTask}
              index={index}
              userAnswer={userAnswer}
              resultsMode={resultsMode}
              onAnswerChange={handleAnswerChange}
            />
          );
        })}
      </div>

      <CheckAnswersButton 
        onCheckAnswers={checkAllAnswers} 
        show={!resultsMode} 
      />
    </div>
  );
};

export default TestSolver;
