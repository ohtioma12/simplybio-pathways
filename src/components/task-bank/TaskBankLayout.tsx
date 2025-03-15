
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import UploadTaskButton from './UploadTaskButton';
import GenerateTestButton from './GenerateTestButton';
import MyTestsButton from './MyTestsButton';
import { Task } from './TaskCard';
import { usePermissions } from '@/hooks/use-permissions';
import TelegramVerificationDialog from './TelegramVerificationDialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TaskBankLayoutProps {
  tasks: Task[];
  filteredTasks: Task[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTopic: string;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
  selectedSubtopic: string;
  setSelectedSubtopic: React.Dispatch<React.SetStateAction<string>>;
  selectedLine: string;
  setSelectedLine: React.Dispatch<React.SetStateAction<string>>;
  selectedPart: string;
  setSelectedPart: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
  showFilters: boolean;
  toggleFilters: () => void;
  isLargeScreen: boolean;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onTaskAdd: (newTask: Task) => void;
}

const TaskBankLayout: React.FC<TaskBankLayoutProps> = ({
  tasks,
  filteredTasks,
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
  selectedSubtopic,
  setSelectedSubtopic,
  selectedLine,
  setSelectedLine,
  selectedPart,
  setSelectedPart,
  resetFilters,
  showFilters,
  toggleFilters,
  isLargeScreen,
  onTaskUpdate,
  onTaskDelete,
  onTaskAdd
}) => {
  const { canCreateTasks, isAuthenticated, isTelegramVerified, canSolveTasks } = usePermissions();
  const [showTelegramDialog, setShowTelegramDialog] = useState(false);
  const [telegramChecked, setTelegramChecked] = useState(false);

  // Verify telegram subscription
  useEffect(() => {
    // Always check subscription status when component loads
    const isSubscribed = localStorage.getItem('telegramSubscribed') === 'true';
    setTelegramChecked(isSubscribed);
    
    // Show dialog for authenticated users who aren't subscribed
    if (isAuthenticated && !isSubscribed) {
      setShowTelegramDialog(true);
    }
  }, [isAuthenticated]);

  const handleVerifySuccess = () => {
    setTelegramChecked(true);
  };
  
  // Periodically check telegram subscription (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Function to simulate checking subscription status
    const checkSubscriptionStatus = () => {
      // In a real app, this would make an API call to verify subscription
      const isSubscribed = localStorage.getItem('telegramSubscribed') === 'true';
      
      // If subscription was revoked, show notification
      if (telegramChecked && !isSubscribed) {
        setTelegramChecked(false);
        setShowTelegramDialog(true);
      }
    };
    
    // Check every 5 minutes
    const intervalId = setInterval(checkSubscriptionStatus, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [isAuthenticated, telegramChecked]);

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Show subscription alert if authenticated but not verified */}
        {isAuthenticated && !telegramChecked && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-700">
              Для доступа к заданиям необходимо подписаться на Telegram канал Pro100 Bio.
              <Button 
                variant="link" 
                className="p-0 h-auto text-amber-700 underline ml-1" 
                onClick={() => setShowTelegramDialog(true)}
              >
                Подписаться сейчас
              </Button>
            </AlertDescription>
          </Alert>
        )}
      
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Task Filters */}
          <div className="lg:w-1/4">
            <TaskFilters
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedSubtopic={selectedSubtopic}
              setSelectedSubtopic={setSelectedSubtopic}
              selectedLine={selectedLine}
              setSelectedLine={setSelectedLine}
              selectedPart={selectedPart}
              setSelectedPart={setSelectedPart}
              resetFilters={resetFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              isLargeScreen={isLargeScreen}
            />
          </div>

          {/* Task List */}
          <div className="lg:w-3/4">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Задания ({filteredTasks.length})
              </h2>
              <div className="flex gap-2 flex-wrap">
                {isAuthenticated && <GenerateTestButton tasks={tasks} />}
                {isAuthenticated && <MyTestsButton />}
                {canCreateTasks && <UploadTaskButton onTaskAdd={onTaskAdd} />}
              </div>
            </div>

            {isAuthenticated ? (
              telegramChecked ? (
                <TaskList 
                  tasks={filteredTasks} 
                  onTaskUpdate={onTaskUpdate} 
                  onTaskDelete={onTaskDelete}
                />
              ) : (
                <div className="p-8 bg-white rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-semibold mb-4">Telegram подписка</h3>
                  <p className="text-muted-foreground mb-6">
                    Для просмотра и выполнения заданий необходимо подписаться на наш Telegram канал.
                  </p>
                  <Button 
                    variant="default" 
                    onClick={() => setShowTelegramDialog(true)}
                  >
                    Подписаться на канал
                  </Button>
                </div>
              )
            ) : (
              <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">Доступ ограничен</h3>
                <p className="text-muted-foreground mb-6">
                  Для просмотра и выполнения заданий необходимо войти в систему.
                </p>
                <p className="text-sm text-muted-foreground">
                  Воспользуйтесь кнопкой "Войти" в верхнем меню.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Telegram Verification Dialog */}
      <TelegramVerificationDialog 
        isOpen={showTelegramDialog} 
        onClose={() => setShowTelegramDialog(false)}
        onVerifySuccess={handleVerifySuccess}
      />
    </section>
  );
};

export default TaskBankLayout;
