
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TaskFilters from './TaskFilters';
import UploadTaskButton from './UploadTaskButton';
import TaskList from './TaskList';
import { Task } from './TaskCard';

interface TaskBankLayoutProps {
  tasks: Task[];
  filteredTasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  selectedSubtopic: string | null;
  setSelectedSubtopic: (subtopic: string | null) => void;
  selectedLine: string | null;
  setSelectedLine: (line: string | null) => void;
  selectedPart: string | null;
  setSelectedPart: (part: string | null) => void;
  resetFilters: () => void;
  showFilters: boolean;
  toggleFilters: () => void;
  isLargeScreen: boolean;
  onTaskUpdate: (updatedTask: Task) => void;
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
  onTaskAdd
}) => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
        {/* Mobile filters toggle */}
        <div className="lg:hidden mb-6">
          <motion.button
            onClick={toggleFilters}
            className="w-full py-2 px-4 text-sm bg-secondary rounded-lg flex items-center justify-center"
            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}</span>
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="ml-2 h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters sidebar */}
          <AnimatePresence>
            {(showFilters || isLargeScreen) && (
              <motion.div 
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3 space-y-6"
              >
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
                />

                {/* Upload new task section (for admin/teacher) */}
                <UploadTaskButton onTaskAdd={onTaskAdd} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tasks list */}
          <motion.div 
            className="lg:col-span-9 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TaskList 
              tasks={filteredTasks} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              resetFilters={resetFilters}
              onTaskUpdate={onTaskUpdate}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TaskBankLayout;
