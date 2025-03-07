
import React from 'react';
import { Container } from '@/components/ui/sidebar';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import UploadTaskButton from './UploadTaskButton';
import { Task } from './TaskCard';

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
  return (
    <section className="py-12 bg-slate-50">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Task Filters */}
          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            selectedSubtopic={selectedSubtopic}
            setSelectedSubtopic={setSelectedSubtopic}
            selectedLine={selectedLine}
            setSelectedLine={setSelectedLine}
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
            resetFilters={resetFilters}
            showFilters={showFilters}
            toggleFilters={toggleFilters}
            isLargeScreen={isLargeScreen}
          />

          {/* Task List */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Задания ({filteredTasks.length})
              </h2>
              <UploadTaskButton onTaskAdd={onTaskAdd} />
            </div>

            <TaskList 
              tasks={filteredTasks} 
              onTaskUpdate={onTaskUpdate} 
              onTaskDelete={onTaskDelete}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TaskBankLayout;
