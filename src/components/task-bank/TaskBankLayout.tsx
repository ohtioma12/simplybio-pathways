
import React from 'react';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import UploadTaskButton from './UploadTaskButton';
import GenerateTestButton from './GenerateTestButton';
import { Task } from './TaskCard';
import { usePermissions } from '@/hooks/use-permissions';

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
  const { canCreateTasks, isAuthenticated } = usePermissions();

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Task Filters - Reduced width */}
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

          {/* Task List - Increased width */}
          <div className="lg:w-3/4">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Задания ({filteredTasks.length})
              </h2>
              <div className="flex gap-2 flex-wrap">
                <GenerateTestButton tasks={tasks} />
                {canCreateTasks && <UploadTaskButton onTaskAdd={onTaskAdd} />}
              </div>
            </div>

            {isAuthenticated ? (
              <TaskList 
                tasks={filteredTasks} 
                onTaskUpdate={onTaskUpdate} 
                onTaskDelete={onTaskDelete}
              />
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
    </section>
  );
};

export default TaskBankLayout;
