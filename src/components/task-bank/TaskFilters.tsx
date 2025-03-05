
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

// Mock data for task topics
const topics = [
  'Молекулярная биология',
  'Клетка как биологическая система',
  'Организм как биологическая система',
  'Система и многообразие органического мира',
  'Организм человека и его здоровье',
  'Эволюция живой природы',
  'Экосистемы и присущие им закономерности',
];

// Mock data for task lines (lines of the ЕГЭ exam)
const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

interface TaskFiltersProps {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  selectedLine: string | null;
  setSelectedLine: (line: string | null) => void;
  selectedPart: string | null;
  setSelectedPart: (part: string | null) => void;
  resetFilters: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  selectedTopic,
  setSelectedTopic,
  selectedLine,
  setSelectedLine,
  selectedPart,
  setSelectedPart,
  resetFilters,
}) => {
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
        {(selectedTopic || selectedLine || selectedPart) && (
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
        {/* Topic filter */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Label htmlFor="topic">Тема</Label>
          <Select
            value={selectedTopic || ""}
            onValueChange={value => setSelectedTopic(value || null)}
          >
            <SelectTrigger id="topic">
              <SelectValue placeholder="Выберите тему" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-topics">Все темы</SelectItem>
              {topics.map(topic => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            onValueChange={value => setSelectedLine(value || null)}
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
            onValueChange={value => setSelectedPart(value || null)}
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
      </div>
    </motion.div>
  );
};

export default TaskFilters;
