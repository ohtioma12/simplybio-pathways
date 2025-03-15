
import React from 'react';
import HeroSection from '@/components/task-bank/HeroSection';
import TaskBankLayout from '@/components/task-bank/TaskBankLayout';
import CtaSection from '@/components/task-bank/CtaSection';
import ReadyMadeTests from '@/components/task-bank/ReadyMadeTests';
import { sampleTasks } from '@/components/task-bank/data';
import { useTaskManagement } from '@/hooks/use-task-management';
import { useTaskFilters } from '@/hooks/use-task-filters';
import { usePermissions } from '@/hooks/use-permissions';

const TaskBank = () => {
  // Initialize task management
  const { 
    tasks, 
    handleTaskUpdate, 
    handleNewTask,
    handleTaskDelete
  } = useTaskManagement(sampleTasks);

  // Initialize task filters
  const {
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
    showFilters,
    isLargeScreen,
    getFilteredTasks,
    resetFilters,
    toggleFilters
  } = useTaskFilters(tasks);

  // Get filtered tasks
  const filteredTasks = getFilteredTasks(tasks);
  const { isAuthenticated } = usePermissions();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Ready-made Tests */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <ReadyMadeTests allTasks={tasks} />
        </div>
      </section>

      {/* Task Bank Section */}
      <TaskBankLayout
        tasks={tasks}
        filteredTasks={filteredTasks}
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
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskAdd={handleNewTask}
      />

      {/* CTA Section */}
      <CtaSection />
    </>
  );
};

export default TaskBank;
