
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { topicStructure } from './data';

// Import the new filter components
import FilterOption from './filters/FilterOption';
import TopicFilter from './filters/TopicFilter';
import SelectFilter from './filters/SelectFilter';
import SearchFilter from './filters/SearchFilter';
import FilterSummary from './filters/FilterSummary';

// Mock data for task lines (lines of the ЕГЭ exam)
const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

interface TaskFiltersProps {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  selectedSubtopic: string | null;
  setSelectedSubtopic: (subtopic: string | null) => void;
  selectedLine: string | null;
  setSelectedLine: (line: string | null) => void;
  selectedPart: string | null;
  setSelectedPart: (part: string | null) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showFilters: boolean;
  toggleFilters: () => void;
  isLargeScreen: boolean;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  selectedTopic,
  setSelectedTopic,
  selectedSubtopic,
  setSelectedSubtopic,
  selectedLine,
  setSelectedLine,
  selectedPart,
  setSelectedPart,
  resetFilters,
  searchQuery,
  setSearchQuery,
  showFilters,
  toggleFilters,
  isLargeScreen
}) => {
  // Handle topic selection
  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(topicName);
    setSelectedSubtopic(null); // Reset subtopic when topic changes
  };

  // Handle subtopic selection
  const handleSubtopicSelect = (subtopicName: string) => {
    setSelectedSubtopic(subtopicName);
  };

  // Convert task lines to options format
  const lineOptions = taskLines.map(line => ({
    value: line,
    label: line
  }));

  // Part options
  const partOptions = [
    { value: 'Часть 1', label: 'Часть 1' },
    { value: 'Часть 2', label: 'Часть 2' }
  ];

  return (
    <motion.div 
      className="glass-card p-5 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </h3>
        {(selectedTopic || selectedSubtopic || selectedLine || selectedPart) && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-muted-foreground text-xs"
            >
              Сбросить
              <X className="ml-1 h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {/* Topic filter - hierarchical view */}
        <FilterOption label="Тема и подтема" delay={0.1}>
          <TopicFilter
            topics={topicStructure}
            selectedTopic={selectedTopic}
            selectedSubtopic={selectedSubtopic}
            onTopicSelect={handleTopicSelect}
            onSubtopicSelect={handleSubtopicSelect}
          />
        </FilterOption>

        {/* Line filter */}
        <FilterOption label="Линия задания" delay={0.2}>
          <SelectFilter
            id="line"
            placeholder="Выберите линию"
            value={selectedLine}
            onChange={setSelectedLine}
            options={lineOptions}
            allValue="all-lines"
            allLabel="Все линии"
          />
        </FilterOption>

        {/* Part filter */}
        <FilterOption label="Часть ЕГЭ" delay={0.3}>
          <SelectFilter
            id="part"
            placeholder="Выберите часть"
            value={selectedPart}
            onChange={setSelectedPart}
            options={partOptions}
            allValue="all-parts"
            allLabel="Все части"
          />
        </FilterOption>

        {/* Search filter */}
        <FilterOption label="Поиск" delay={0.4}>
          <SearchFilter
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск заданий..."
          />
        </FilterOption>

        {/* Summary of selected filters */}
        <FilterSummary
          selectedTopic={selectedTopic}
          selectedSubtopic={selectedSubtopic}
          selectedLine={selectedLine}
          selectedPart={selectedPart}
        />
      </div>
    </motion.div>
  );
};

export default TaskFilters;
