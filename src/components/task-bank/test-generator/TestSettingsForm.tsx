
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TestSettingsFormProps {
  testName: string;
  setTestName: React.Dispatch<React.SetStateAction<string>>;
  numTasks: number;
  setNumTasks: React.Dispatch<React.SetStateAction<number>>;
  selectedLineFilter: string;
  setSelectedLineFilter: React.Dispatch<React.SetStateAction<string>>;
  uniqueLines: string[];
  selectRandomTasks: () => void;
  selectedTasksCount: number;
  maxTasks: number;
}

const TestSettingsForm: React.FC<TestSettingsFormProps> = ({
  testName,
  setTestName,
  numTasks,
  setNumTasks,
  selectedLineFilter,
  setSelectedLineFilter,
  uniqueLines,
  selectRandomTasks,
  selectedTasksCount,
  maxTasks
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Название варианта</label>
        <Input
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Введите название варианта"
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Количество заданий</label>
        <Input
          type="number"
          min="1"
          max={maxTasks}
          value={numTasks}
          onChange={(e) => setNumTasks(parseInt(e.target.value, 10))}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Фильтр по линии</label>
        <Select 
          value={selectedLineFilter} 
          onValueChange={setSelectedLineFilter}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Выберите линию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все линии</SelectItem>
            {uniqueLines.filter(line => line !== 'all').map(line => (
              <SelectItem key={line} value={line}>
                {line}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="pt-4">
        <Button variant="secondary" onClick={selectRandomTasks}>
          Выбрать случайные задания
        </Button>
      </div>
      
      <div className="pt-2">
        <p className="text-sm text-muted-foreground mb-2">
          Выбрано заданий: {selectedTasksCount} из {numTasks}
        </p>
      </div>
    </div>
  );
};

export default TestSettingsForm;
