
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
import UserStatistics from '@/components/task-bank/user-statistics/UserStatistics';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

const TestSolver: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const { user } = useAuth();
  
  const {
    test,
    taskDetails,
    userAnswers,
    pdfOptions,
    setPdfOptions,
    resultsMode,
    score,
    showStatistics,
    setShowStatistics,
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
      
      {resultsMode && (
        <>
          <TestResults 
            score={score} 
            answers={userAnswers}
          />
          
          {/* Show user statistics automatically after solving */}
          {showStatistics && user && (
            <div className="mb-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Моя статистика</h3>
              <UserStatistics userId={user.id} />
            </div>
          )}
        </>
      )}
      
      <div className="space-y-6 mt-6">
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

      {!resultsMode && (
        <div className="mt-8 flex justify-end">
          <Button
            variant="outline"
            onClick={handleGeneratePdf}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Скачать PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestSolver;
