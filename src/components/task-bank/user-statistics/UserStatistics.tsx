
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getUserSolvedTests, 
  getUserTaskStatistics,
  SolvedTest, 
  deleteUserTest,
  TaskStatistic 
} from './services';
import StatisticsCards from './StatisticsCards';
import TestsTable from './TestsTable';
import TasksTable from './TasksTable';
import TestDetailsDialog from './TestDetailsDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface UserStatisticsProps {
  userId: string;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tests');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<SolvedTest | null>(null);
  
  // Get the statistics data from the service
  const solvedTests = getUserSolvedTests(userId);
  const taskStatistics: TaskStatistic[] = getUserTaskStatistics(userId);
  
  // Calculate the overall statistics
  const totalTests = solvedTests.length;
  const totalAttemptedTasks = taskStatistics.length;
  
  const totalCorrectAnswers = solvedTests.reduce((sum, test) => {
    return sum + test.answers.filter(a => a.isCorrect).length;
  }, 0);
  
  const totalQuestions = solvedTests.reduce((sum, test) => {
    return sum + test.answers.length;
  }, 0);
  
  const averageScore = totalQuestions > 0 
    ? Math.round((totalCorrectAnswers / totalQuestions) * 100) 
    : 0;
  
  const handleDeleteTest = (testId: string) => {
    if (deleteUserTest(testId, userId)) {
      toast.success('Вариант удален из истории');
    } else {
      toast.error('Ошибка при удалении варианта');
    }
  };
  
  const handleViewTestDetails = (testId: string) => {
    const test = solvedTests.find(t => t.testId === testId);
    if (test) {
      setSelectedTest(test);
      setShowDetailsDialog(true);
    } else {
      // Fallback to redirect to the test statistics page directly
      navigate(`/test-statistics/${testId}`);
    }
  };
  
  if (totalTests === 0 && totalAttemptedTasks === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          У вас пока нет статистики. Решите несколько заданий или вариантов, чтобы увидеть свои результаты.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      <StatisticsCards 
        totalTests={totalTests}
        totalAttemptedTasks={totalAttemptedTasks}
        averageScore={averageScore}
        userId={userId}
      />
      
      <Tabs defaultValue="tests" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tests">Решенные варианты</TabsTrigger>
          <TabsTrigger value="tasks">Задания</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="mt-6">
          {solvedTests.length > 0 ? (
            <TestsTable 
              solvedTests={solvedTests}
              onDeleteTest={handleDeleteTest}
              onViewDetails={handleViewTestDetails}
            />
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Вы еще не решили ни одного варианта
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          {taskStatistics.length > 0 ? (
            <TasksTable taskStatistics={taskStatistics} />
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Вы еще не решили ни одного задания
            </p>
          )}
        </TabsContent>
      </Tabs>
      
      <TestDetailsDialog 
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        selectedTest={selectedTest}
      />
    </div>
  );
};

export default UserStatistics;
