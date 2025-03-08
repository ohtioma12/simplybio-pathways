
import React, { useState, useEffect } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from './TaskCard';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface TestGeneratorDialogProps {
  tasks: Task[];
}

interface TaskOption {
  id: number;
  taskCode: string;
  title: string;
  line: string;
  selected: boolean;
}

const TestGeneratorDialog: React.FC<TestGeneratorDialogProps> = ({ tasks }) => {
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

  const handleGeneratePDF = () => {
    const selectedTasks = taskOptions.filter(task => task.selected);
    
    if (selectedTasks.length === 0) {
      toast.error('Выберите хотя бы одно задание для генерации варианта');
      return;
    }

    try {
      // Create PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text(testName, 105, 15, { align: 'center' });
      
      // Create task list table
      const tableData = selectedTasks.map((task, index) => [
        (index + 1).toString(), // Task number in sequence
        task.taskCode, // Task code
        task.line, // Line number
        task.title // Task title
      ]);
      
      // @ts-ignore - jsPDF autotable method
      doc.autoTable({
        head: [['№', 'Код', 'Линия', 'Название задания']],
        body: tableData,
        startY: 25,
        headStyles: { fillColor: [41, 128, 185] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 25 }
      });
      
      // Save PDF
      doc.save(`${testName.replace(/\s+/g, '_')}.pdf`);
      
      // Show success message
      toast.success('Вариант успешно сгенерирован и скачан');
      
      // Create online test version (simplified for this implementation)
      const testId = Date.now().toString();
      localStorage.setItem(`test_${testId}`, JSON.stringify({
        id: testId,
        name: testName,
        tasks: selectedTasks.map(task => task.id),
        createdAt: new Date().toISOString()
      }));
      
      toast.success('Вариант также доступен для решения онлайн');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Произошла ошибка при генерации варианта');
    }
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle>Генерация варианта ЕГЭ</DialogTitle>
        <DialogDescription>
          Создайте свой вариант из банка заданий для тренировки или проверки знаний
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              max={tasks.length}
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
              Выбрано заданий: {taskOptions.filter(task => task.selected).length} из {numTasks}
            </p>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Доступные задания</label>
          <ScrollArea className="h-[40vh] border rounded-md p-2 mt-1">
            <div className="space-y-2">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.selected}
                    onCheckedChange={() => toggleTaskSelection(task.id)}
                  />
                  <div className="grid grid-cols-[1fr_auto] gap-x-2 w-full">
                    <label
                      htmlFor={`task-${task.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.title}
                    </label>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                        {task.taskCode}
                      </span>
                      <span className="text-xs bg-slate-100 rounded-full px-2 py-1">
                        {task.line}
                      </span>
                    </div>
                    <div className="col-span-2 text-xs text-muted-foreground mt-1">
                      Код задания: {task.taskCode}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredTasks.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  Нет доступных заданий с выбранными фильтрами
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Отмена</Button>
        <Button onClick={handleGeneratePDF}>Создать вариант</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TestGeneratorDialog;
