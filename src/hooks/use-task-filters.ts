
import { useState, useEffect } from 'react';
import { Task } from '@/components/task-bank/TaskCard';

export const useTaskFilters = (initialTasks: Task[]) => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  
  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filter tasks based on search and filters
  const getFilteredTasks = (tasks: Task[]) => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = !selectedTopic || task.topic === selectedTopic;
      const matchesSubtopic = !selectedSubtopic || task.subtopic === selectedSubtopic;
      const matchesLine = !selectedLine || task.line === selectedLine;
      const matchesPart = !selectedPart || task.part === selectedPart;
      
      return matchesSearch && matchesTopic && matchesSubtopic && matchesLine && matchesPart;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setSelectedLine(null);
    setSelectedPart(null);
  };

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return {
    // Filter state
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
    
    // UI state
    showFilters,
    isLargeScreen,
    
    // Methods
    getFilteredTasks,
    resetFilters,
    toggleFilters
  };
};
