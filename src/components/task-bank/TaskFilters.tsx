
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
    <div className="glass-card p-5 rounded-xl">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </h3>
        {(selectedTopic || selectedLine || selectedPart) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-muted-foreground text-xs"
          >
            Сбросить
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Topic filter */}
        <div>
          <Label htmlFor="topic">Тема</Label>
          <Select
            value={selectedTopic || ""}
            onValueChange={value => setSelectedTopic(value || null)}
          >
            <SelectTrigger id="topic">
              <SelectValue placeholder="Выберите тему" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все темы</SelectItem>
              {topics.map(topic => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Line filter */}
        <div>
          <Label htmlFor="line">Линия задания</Label>
          <Select
            value={selectedLine || ""}
            onValueChange={value => setSelectedLine(value || null)}
          >
            <SelectTrigger id="line">
              <SelectValue placeholder="Выберите линию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все линии</SelectItem>
              {taskLines.map(line => (
                <SelectItem key={line} value={line}>
                  {line}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Part filter */}
        <div>
          <Label htmlFor="part">Часть ЕГЭ</Label>
          <Select
            value={selectedPart || ""}
            onValueChange={value => setSelectedPart(value || null)}
          >
            <SelectTrigger id="part">
              <SelectValue placeholder="Выберите часть" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все части</SelectItem>
              <SelectItem value="Часть 1">Часть 1</SelectItem>
              <SelectItem value="Часть 2">Часть 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
