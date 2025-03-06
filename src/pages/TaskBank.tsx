
import React from 'react';
import HeroSection from '@/components/task-bank/HeroSection';
import TaskBankLayout from '@/components/task-bank/TaskBankLayout';
import CtaSection from '@/components/task-bank/CtaSection';
import { sampleTasks } from '@/components/task-bank/data';
import { useTaskManagement } from '@/hooks/use-task-management';
import { useTaskFilters } from '@/hooks/use-task-filters';

const TaskBank = () => {
  // Initialize task management
  const { 
    tasks, 
    handleTaskUpdate, 
    handleNewTask 
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
        onTaskAdd={handleNewTask}
      />

      {/* CTA Section */}
      <CtaSection />
    </>
  );
};

export default TaskBank;
