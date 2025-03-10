
import { useState, useEffect } from 'react';
import { Task } from '../TaskCard';
import { TaskOption } from './types';
import { toast } from 'sonner';

export const useTestGenerator = (tasks: Task[]) => {
  const [testName, setTestName] = useState('Тренировочный вариант 1');
  const [taskOptions, setTaskOptions] = useState<TaskOption[]>([]);
  const [selectedLineFilter, setSelectedLineFilter] = useState<string>('all');
  const [filteredTasks, setFilteredTasks] = useState<TaskOption[]>([]);
  const [numTasks, setNumTasks] = useState<number>(28);

  // Generate task codes if they don't exist
  useEffect(() => {
    const tasksWithCodes = tasks.map((task, index) => {
      const taskLine = parseInt(task.line.replace('Линия ', ''), 10) || 0;
      // Create a unique task code combining line number and a sequence
      const taskCode = `${taskLine.toString().padStart(2, '0')}-${(index % 100).toString().padStart(3, '0')}`;
      
      return {
        id: task.id,
        taskCode,
        title: task.title,
        line: task.line,
        selected: false
      };
    });
    
    setTaskOptions(tasksWithCodes);
    setFilteredTasks(tasksWithCodes);
  }, [tasks]);

  // Filter tasks by line
  useEffect(() => {
    if (selectedLineFilter === 'all') {
      setFilteredTasks(taskOptions);
    } else {
      setFilteredTasks(
        taskOptions.filter(task => task.line === selectedLineFilter)
      );
    }
  }, [selectedLineFilter, taskOptions]);

  // Get unique lines for the filter
  const uniqueLines = ['all', ...Array.from(new Set(tasks.map(task => task.line)))];

  const toggleTaskSelection = (id: number) => {
    setTaskOptions(prevOptions => 
      prevOptions.map(option => 
        option.id === id ? { ...option, selected: !option.selected } : option
      )
    );
  };

  const addTaskByCode = (code: string) => {
    const normalizedCode = code.trim();
    const task = taskOptions.find(t => t.taskCode === normalizedCode);
    
    if (!task) {
      toast.error(`Задание с кодом ${normalizedCode} не найдено`);
      return;
    }
    
    if (task.selected) {
      toast.info(`Задание с кодом ${normalizedCode} уже добавлено в вариант`);
      return;
    }
    
    setTaskOptions(prevOptions => 
      prevOptions.map(option => 
        option.id === task.id ? { ...option, selected: true } : option
      )
    );
    
    toast.success(`Задание с кодом ${normalizedCode} добавлено в вариант`);
  };

  const selectRandomTasks = () => {
    // Get all available lines
    const lines = Array.from(new Set(taskOptions.map(task => task.line)));
    
    // Reset all selections
    const resetTasks = taskOptions.map(task => ({ ...task, selected: false }));
    
    // Prepare an array to hold selected tasks
    let selectedTasks = [...resetTasks];
    let totalSelected = 0;
    
    // Try to select tasks from each line proportionally
    lines.forEach(line => {
      const tasksInLine = resetTasks.filter(task => task.line === line);
      const lineNumber = parseInt(line.replace('Линия ', ''), 10) || 0;
      
      // Determine how many tasks to select from this line
      // For simplicity, at least 1 task from each line if available
      const tasksToSelectCount = Math.ceil(tasksInLine.length * (numTasks / tasks.length));
      
      if (tasksInLine.length > 0 && totalSelected < numTasks) {
        // Randomly select tasks from this line
        const shuffled = [...tasksInLine].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(tasksToSelectCount, numTasks - totalSelected));
        
        // Mark selected tasks
        selected.forEach(task => {
          selectedTasks = selectedTasks.map(t => 
            t.id === task.id ? { ...t, selected: true } : t
          );
        });
        
        totalSelected += selected.length;
      }
    });
    
    // If we still need more tasks, randomly select from the remaining unselected tasks
    if (totalSelected < numTasks) {
      const unselected = selectedTasks.filter(task => !task.selected);
      const shuffled = [...unselected].sort(() => 0.5 - Math.random());
      const additional = shuffled.slice(0, numTasks - totalSelected);
      
      additional.forEach(task => {
        selectedTasks = selectedTasks.map(t => 
          t.id === task.id ? { ...t, selected: true } : t
        );
      });
    }
    
    setTaskOptions(selectedTasks);
  };

  return {
    testName,
    setTestName,
    taskOptions,
    setTaskOptions,
    selectedLineFilter,
    setSelectedLineFilter,
    filteredTasks,
    numTasks,
    setNumTasks,
    uniqueLines,
    toggleTaskSelection,
    selectRandomTasks,
    addTaskByCode,
    selectedTasksCount: taskOptions.filter(task => task.selected).length
  };
};
