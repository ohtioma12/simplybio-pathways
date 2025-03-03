
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

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Task Bank Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-8"
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
