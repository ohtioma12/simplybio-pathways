
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/task-bank/HeroSection';
import TaskFilters from '@/components/task-bank/TaskFilters';
import UploadTaskButton from '@/components/task-bank/UploadTaskButton';
import TaskList from '@/components/task-bank/TaskList';
import CtaSection from '@/components/task-bank/CtaSection';
import { sampleTasks } from '@/components/task-bank/data';
import { Task } from '@/components/task-bank/TaskCard';
import { ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const TaskBank = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  
  // State for tasks and UI
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
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
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || task.topic === selectedTopic;
    const matchesSubtopic = !selectedSubtopic || task.subtopic === selectedSubtopic;
    const matchesLine = !selectedLine || task.line === selectedLine;
    const matchesPart = !selectedPart || task.part === selectedPart;
    
    return matchesSearch && matchesTopic && matchesSubtopic && matchesLine && matchesPart;
  });

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

  // Handle task update
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast.success('Задание успешно обновлено!');
  };

  // Handle new task addition
  const handleNewTask = (newTask: Task) => {
    // Generate a new unique ID
    const newId = Math.max(...tasks.map(task => task.id), 0) + 1;
    const taskWithId = { ...newTask, id: newId };
    
    setTasks(prevTasks => [...prevTasks, taskWithId]);
    toast.success('Новое задание добавлено!');
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Task Bank Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
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
                  <UploadTaskButton onTaskAdd={handleNewTask} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tasks list */}
            <motion.div 
              className="lg:col-span-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TaskList 
                tasks={filteredTasks} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                resetFilters={resetFilters}
                onTaskUpdate={handleTaskUpdate}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
};

export default TaskBank;
