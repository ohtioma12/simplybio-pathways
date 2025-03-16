
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { getUserSolvedTests, SolvedTest, deleteUserTest } from './statistics-service';
import StatisticsCards from './StatisticsCards';
import TestsTable from './TestsTable';
import TasksTable from './TasksTable';
import TestDetailsDialog from './TestDetailsDialog';
import { getTaskStatistics, calculateOverallStatistics } from './utils';

interface UserStatisticsProps {
  userId?: string;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ userId }) => {
  const [solvedTests, setSolvedTests] = useState<SolvedTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("tests");

  useEffect(() => {
    if (!userId) return;
    
    loadUserTests();
  }, [userId]);

  const loadUserTests = () => {
    setLoading(true);
    const tests = getUserSolvedTests(userId);
    setSolvedTests(tests);
    setLoading(false);
  };

  const handleDeleteTest = (testId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить результаты этого варианта?')) {
      if (deleteUserTest(testId, userId)) {
        toast.success('Результаты варианта удалены');
        loadUserTests();
      } else {
        toast.error('Ошибка при удалении результатов');
      }
    }
  };

  const getSelectedTest = () => {
    return solvedTests.find(test => test.testId === selectedTestId) || null;
  };

  if (loading) {
    return <div className="py-8 text-center">Загрузка статистики...</div>;
  }

  if (solvedTests.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">У вас пока нет решенных вариантов</p>
      </div>
    );
  }

  // Get statistics using the extracted utility functions
  const { totalPoints, totalPossiblePoints, overallPercentage } = calculateOverallStatistics(solvedTests);
  const selectedTest = getSelectedTest();
  const taskStats = getTaskStatistics(solvedTests);

  return (
    <div className="space-y-6">
      <StatisticsCards 
        solvedTests={solvedTests}
        totalPoints={totalPoints}
        totalPossiblePoints={totalPossiblePoints}
        overallPercentage={overallPercentage}
        userId={userId}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
          <TabsTrigger value="tests">По вариантам</TabsTrigger>
          <TabsTrigger value="tasks">По заданиям</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="mt-4">
          <TestsTable 
            solvedTests={solvedTests}
            onDeleteTest={handleDeleteTest}
            onViewDetails={(testId) => {
              setSelectedTestId(testId);
              setShowTestDetails(true);
            }}
          />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <TasksTable taskStatistics={taskStats} />
        </TabsContent>
      </Tabs>
      
      <TestDetailsDialog 
        open={showTestDetails}
        onOpenChange={setShowTestDetails}
        selectedTest={selectedTest}
      />
    </div>
  );
};

export default UserStatistics;
