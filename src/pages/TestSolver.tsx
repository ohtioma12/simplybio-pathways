
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, FileDown, ArrowLeft } from 'lucide-react';
import { SavedTest, TaskOption, UserAnswer, TestGenerationOptions } from '@/components/task-bank/test-generator/types';
import { generateTestPdf } from '@/components/task-bank/test-generator/pdfGenerator';
import { useAuth } from '@/components/auth/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/components/task-bank/TaskCard';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { sampleTasks } from '@/components/task-bank/data';

const TestSolver: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<SavedTest | null>(null);
  const [taskDetails, setTaskDetails] = useState<TaskOption[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [pdfOptions, setPdfOptions] = useState<TestGenerationOptions>({
    includeExplanations: false,
    includeAnswerKey: false
  });
  
  // Load test data
  useEffect(() => {
    if (!testId) return;
    
    try {
      const testData = localStorage.getItem(`test_${testId}`);
      if (!testData) {
        toast.error('Вариант не найден');
        navigate('/task-bank');
        return;
      }
      
      const parsedTest: SavedTest = JSON.parse(testData);
      setTest(parsedTest);
      
      // Load tasks details
      const taskIds = parsedTest.tasks;
      const tasksDetails = taskIds.map(id => {
        const task = sampleTasks.find(t => t.id === id);
        if (!task) return null;
        
        return {
          id: task.id,
          taskCode: `${task.line.replace('Линия ', '')}-${task.id.toString().padStart(3, '0')}`,
          title: task.title,
          line: task.line,
          selected: true
        };
      }).filter(Boolean) as TaskOption[];
      
      setTaskDetails(tasksDetails);
      
      // Initialize user answers
      setUserAnswers(taskIds.map(id => ({ taskId: id, answer: '' })));
      
    } catch (error) {
      console.error('Error loading test:', error);
      toast.error('Ошибка при загрузке варианта');
    }
  }, [testId, navigate]);
  
  const handleAnswerChange = (taskId: number, value: string) => {
    setUserAnswers(prev => 
      prev.map(answer => 
        answer.taskId === taskId ? { ...answer, answer: value } : answer
      )
    );
  };
  
  const checkAnswer = (taskId: number) => {
    const userAnswer = userAnswers.find(a => a.taskId === taskId);
    if (!userAnswer || !userAnswer.answer.trim()) {
      toast.error('Введите ответ перед проверкой');
      return;
    }
    
    const task = sampleTasks.find(t => t.id === taskId);
    if (!task?.correctAnswers?.length) {
      toast.error('Для этого задания не указан правильный ответ');
      return;
    }
    
    const isCorrect = task.correctAnswers.some(
      answer => userAnswer.answer.trim().toLowerCase() === answer.toLowerCase()
    );
    
    setUserAnswers(prev => 
      prev.map(answer => 
        answer.taskId === taskId 
          ? { ...answer, isCorrect } 
          : answer
      )
    );
    
    if (isCorrect) {
      toast.success('Правильный ответ!');
    } else {
      toast.error('Неправильный ответ. Попробуйте еще раз.');
    }
  };
  
  const handleGeneratePdf = () => {
    if (!test || taskDetails.length === 0) return;
    
    generateTestPdf(
      test.name, 
      taskDetails, 
      pdfOptions,
      sampleTasks
    );
  };
  
  if (!test || taskDetails.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Загрузка варианта...</h2>
          <Button variant="outline" onClick={() => navigate('/task-bank')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к банку заданий
          </Button>
        </div>
      </div>
    );
  }
  
  const testDate = new Date(test.createdAt);
  const formattedDate = format(testDate, 'dd MMMM yyyy, HH:mm', { locale: ru });
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/task-bank')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к банку заданий
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{test.name}</h1>
            <p className="text-muted-foreground">
              Создан: {formattedDate} • {taskDetails.length} заданий
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pdf-explanations"
                  checked={pdfOptions.includeExplanations}
                  onCheckedChange={(checked) => 
                    setPdfOptions(prev => ({ ...prev, includeExplanations: !!checked }))
                  }
                />
                <label htmlFor="pdf-explanations" className="text-sm">Включить пояснения</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pdf-answers"
                  checked={pdfOptions.includeAnswerKey}
                  onCheckedChange={(checked) => 
                    setPdfOptions(prev => ({ ...prev, includeAnswerKey: !!checked }))
                  }
                />
                <label htmlFor="pdf-answers" className="text-sm">Включить ответы</label>
              </div>
            </div>
            
            <Button onClick={handleGeneratePdf} className="whitespace-nowrap">
              <FileDown className="mr-2 h-4 w-4" />
              Скачать PDF
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {taskDetails.map((task, index) => {
          const fullTask = sampleTasks.find(t => t.id === task.id);
          const userAnswer = userAnswers.find(a => a.taskId === task.id);
          const isAnswered = userAnswer?.isCorrect !== undefined;
          
          return (
            <Card key={task.id} className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        №{index + 1}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {task.taskCode}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                        {task.line}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                  </div>
                  
                  {isAnswered && (
                    <div className="flex items-center">
                      {userAnswer?.isCorrect ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">Верно</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">Неверно</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {fullTask?.topic && (
                  <CardDescription>
                    {fullTask.topic}
                    {fullTask.subtopic && ` > ${fullTask.subtopic}`}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent>
                <p className="mb-4">{fullTask?.description}</p>
                
                {fullTask?.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={fullTask.imageUrl} 
                      alt={fullTask.title} 
                      className="max-h-48 rounded-md object-contain"
                    />
                  </div>
                )}
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Ваш ответ:</label>
                  <Textarea
                    placeholder="Введите ответ на задание..."
                    value={userAnswer?.answer || ''}
                    onChange={(e) => handleAnswerChange(task.id, e.target.value)}
                    className="resize-none"
                  />
                </div>
                
                {isAnswered && !userAnswer?.isCorrect && fullTask?.correctAnswers && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Правильный ответ:</h4>
                    <p className="text-sm text-blue-900">{fullTask.correctAnswers[0]}</p>
                  </div>
                )}
                
                {isAnswered && fullTask?.explanation && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-md">
                    <h4 className="text-sm font-medium text-purple-800 mb-1">Пояснение:</h4>
                    <p className="text-sm text-purple-900">{fullTask.explanation}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => checkAnswer(task.id)}
                  variant={isAnswered ? "outline" : "default"}
                  className="ml-auto"
                >
                  {isAnswered ? "Проверить снова" : "Проверить ответ"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TestSolver;
