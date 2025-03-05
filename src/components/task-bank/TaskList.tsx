
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TaskCard, { Task } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  onTaskUpdate?: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  searchQuery,
  setSearchQuery,
  resetFilters,
  onTaskUpdate
}) => {
  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Поиск задач..."
          className="pl-10 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results info and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-sm text-muted-foreground">
          {tasks.length === 0
            ? 'Заданий не найдено'
            : `Найдено ${tasks.length} ${
                tasks.length === 1 ? 'задание' : (tasks.length < 5 ? 'задания' : 'заданий')
              }`}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-xs"
        >
          Сбросить все фильтры
        </Button>
      </div>

      {/* Task grid */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <TaskCard 
              key={`task-${task.id}`} 
              task={task} 
              index={index} 
              onTaskUpdate={onTaskUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Задания не найдены</p>
          <p className="text-sm mt-2">
            Попробуйте изменить параметры поиска или сбросить фильтры
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
