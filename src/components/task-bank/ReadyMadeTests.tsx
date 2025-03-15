
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateTestPdf, saveTestOnline } from './test-generator/pdfGenerator';
import { sampleTasks } from './data';
import { TaskOption } from './test-generator/types';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthContext';

// Sample ready-made tests
const readyMadeTests = [
  { id: 'ready-1', name: 'Вариант 1', taskIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 'ready-2', name: 'Вариант 2', taskIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { id: 'ready-3', name: 'Вариант 3', taskIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
  { id: 'ready-4', name: 'Вариант 4', taskIds: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
  { id: 'ready-5', name: 'Вариант 5', taskIds: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50] },
  { id: 'ready-6', name: 'Вариант 6', taskIds: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60] },
  { id: 'ready-7', name: 'Вариант 7', taskIds: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70] },
  { id: 'ready-8', name: 'Вариант 8', taskIds: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80] },
  { id: 'ready-9', name: 'Вариант 9', taskIds: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90] },
  { id: 'ready-10', name: 'Вариант 10', taskIds: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100] },
];

interface ReadyMadeTestsProps {
  allTasks: any[];
}

const ReadyMadeTests: React.FC<ReadyMadeTestsProps> = ({ allTasks }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const handleOpenTest = (test: any) => {
    if (!isAuthenticated) {
      toast.error('Необходимо войти в систему для доступа к вариантам');
      return;
    }
    
    // Convert test to expected format
    const taskOptions: TaskOption[] = test.taskIds.map(id => {
      const task = sampleTasks.find(t => t.id === id);
      if (!task) return null;
      
      const lineNumber = parseInt(task.line.replace('Линия ', ''), 10) || 0;
      const taskCode = `${lineNumber.toString().padStart(2, '0')}-${id.toString().padStart(3, '0')}`;
      
      return {
        id: task.id,
        taskCode,
        title: task.title,
        line: task.line,
        selected: true
      };
    }).filter(Boolean) as TaskOption[];
    
    // Save test online
    const testId = saveTestOnline(test.name, taskOptions, user?.id);
    if (testId) {
      navigate(`/test-solver/${testId}`);
    }
  };
  
  const handleDownloadPdf = (test: any) => {
    // Convert test to expected format
    const taskOptions: TaskOption[] = test.taskIds.map(id => {
      const task = sampleTasks.find(t => t.id === id);
      if (!task) return null;
      
      const lineNumber = parseInt(task.line.replace('Линия ', ''), 10) || 0;
      const taskCode = `${lineNumber.toString().padStart(2, '0')}-${id.toString().padStart(3, '0')}`;
      
      return {
        id: task.id,
        taskCode,
        title: task.title,
        line: task.line,
        selected: true
      };
    }).filter(Boolean) as TaskOption[];
    
    // Generate PDF
    generateTestPdf(test.name, taskOptions, { includeExplanations: false, includeAnswerKey: false }, sampleTasks);
  };
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Готовые варианты</CardTitle>
        <CardDescription>
          Варианты от авторов курса — просто выберите и начните решать
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {readyMadeTests.map(test => (
            <Card key={test.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{test.name}</CardTitle>
                <CardDescription>{test.taskIds.length} заданий</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleDownloadPdf(test)}
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleOpenTest(test)}
                  >
                    Решать
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadyMadeTests;
