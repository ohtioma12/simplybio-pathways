
import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { topicStructure } from './data';

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
}) => {
  // State for expanded topics in the list
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);

  // Toggle topic expansion
  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  // Handle topic selection
  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(topicName);
    setSelectedSubtopic(null); // Reset subtopic when topic changes
  };

  // Handle subtopic selection
  const handleSubtopicSelect = (subtopicName: string) => {
    setSelectedSubtopic(subtopicName);
  };

  // Find available subtopics for selected topic
  const availableSubtopics = selectedTopic 
    ? topicStructure.find(t => t.name === selectedTopic)?.subtopics || []
    : [];

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
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="border rounded-md p-2"
        >
          <Label className="mb-2 block">Тема и подтема</Label>
          <div className="max-h-[300px] overflow-y-auto pr-1">
            {topicStructure.map(topic => (
              <div key={topic.id} className="mb-1">
                <div 
                  className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                    selectedTopic === topic.name ? 'bg-prosto-blue-light/30 font-medium' : 'hover:bg-muted'
                  }`}
                >
                  <div 
                    className="flex-1"
                    onClick={() => handleTopicSelect(topic.name)}
                  >
                    {topic.name}
                  </div>
                  <div 
                    className="p-1 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => toggleTopic(topic.id)}
                  >
                    {expandedTopics.includes(topic.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedTopics.includes(topic.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 border-l pl-2 overflow-hidden"
                    >
                      {topic.subtopics.map(subtopic => (
                        <div 
                          key={subtopic.id}
                          className={`p-1 my-1 text-sm rounded cursor-pointer ${
                            selectedSubtopic === subtopic.name ? 'bg-prosto-blue-light/20 font-medium' : 'hover:bg-muted'
                          }`}
                          onClick={() => {
                            handleTopicSelect(topic.name);
                            handleSubtopicSelect(subtopic.name);
                          }}
                        >
                          {subtopic.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Line filter */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Label htmlFor="line">Линия задания</Label>
          <Select
            value={selectedLine || ""}
            onValueChange={value => setSelectedLine(value !== "all-lines" ? value : null)}
          >
            <SelectTrigger id="line">
              <SelectValue placeholder="Выберите линию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-lines">Все линии</SelectItem>
              {taskLines.map(line => (
                <SelectItem key={line} value={line}>
                  {line}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Part filter */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Label htmlFor="part">Часть ЕГЭ</Label>
          <Select
            value={selectedPart || ""}
            onValueChange={value => setSelectedPart(value !== "all-parts" ? value : null)}
          >
            <SelectTrigger id="part">
              <SelectValue placeholder="Выберите часть" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-parts">Все части</SelectItem>
              <SelectItem value="Часть 1">Часть 1</SelectItem>
              <SelectItem value="Часть 2">Часть 2</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Summary of selected filters */}
        {(selectedTopic || selectedSubtopic || selectedLine || selectedPart) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground pt-2 border-t"
          >
            <div className="font-medium mb-1">Активные фильтры:</div>
            <ul className="list-disc list-inside">
              {selectedTopic && <li>Тема: {selectedTopic}</li>}
              {selectedSubtopic && <li>Подтема: {selectedSubtopic}</li>}
              {selectedLine && <li>Линия: {selectedLine}</li>}
              {selectedPart && <li>Часть: {selectedPart}</li>}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskFilters;
