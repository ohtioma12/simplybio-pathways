
import React from 'react';
import HeroSection from '@/components/task-bank/HeroSection';
import TaskBankLayout from '@/components/task-bank/TaskBankLayout';
import CtaSection from '@/components/task-bank/CtaSection';
import { sampleTasks } from '@/components/task-bank/data';
import { useTaskManagement } from '@/hooks/use-task-management';
import { useTaskFilters } from '@/hooks/use-task-filters';
import MyTestsButton from '@/components/task-bank/MyTestsButton';

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

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Task Bank Section */}
      <div className="container mx-auto px-4 mb-4 flex justify-end gap-2">
        <MyTestsButton />
      </div>
      
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
