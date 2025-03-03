
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/task-bank/HeroSection';
import TaskFilters from '@/components/task-bank/TaskFilters';
import UploadTaskButton from '@/components/task-bank/UploadTaskButton';
import TaskList from '@/components/task-bank/TaskList';
import CtaSection from '@/components/task-bank/CtaSection';
import { sampleTasks } from '@/components/task-bank/data';
import { Task } from '@/components/task-bank/TaskCard';

const TaskBank = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [tasks] = useState<Task[]>(sampleTasks);
  const [showFilters, setShowFilters] = useState(false);

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || task.topic === selectedTopic;
    const matchesLine = !selectedLine || task.line === selectedLine;
    const matchesPart = !selectedPart || task.part === selectedPart;
    
    return matchesSearch && matchesTopic && matchesLine && matchesPart;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic(null);
    setSelectedLine(null);
    setSelectedPart(null);
  };

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
            <button
              onClick={toggleFilters}
              className="w-full py-2 px-4 text-sm bg-secondary rounded-lg flex items-center justify-center"
            >
              <span>{showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`lg:col-span-3 space-y-6 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}
            >
              <TaskFilters 
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                selectedLine={selectedLine}
                setSelectedLine={setSelectedLine}
                selectedPart={selectedPart}
                setSelectedPart={setSelectedPart}
                resetFilters={resetFilters}
              />

              {/* Upload new task section (for admin/teacher) */}
              <UploadTaskButton />
            </motion.div>

            {/* Tasks list */}
            <div className="lg:col-span-9">
              <TaskList 
                tasks={filteredTasks} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
};

export default TaskBank;
