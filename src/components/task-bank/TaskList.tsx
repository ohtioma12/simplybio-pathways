
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskCard, { Task } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  searchQuery, 
  setSearchQuery,
  resetFilters
}) => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold">Задания ({tasks.length})</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Поиск заданий..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center glass-card rounded-xl">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Задания не найдены</h3>
          <p className="text-muted-foreground mb-6">
            Попробуйте изменить параметры поиска или сбросить фильтры
          </p>
          <Button onClick={resetFilters}>Сбросить все фильтры</Button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
