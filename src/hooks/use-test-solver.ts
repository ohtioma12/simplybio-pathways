
import { useState, useEffect } from 'react';
import { 
  SavedTest, 
  TaskOption, 
  UserAnswer, 
  TestGenerationOptions,
  ExtendedTask
} from '@/components/task-bank/test-generator/types';
import { sampleTasks } from '@/components/task-bank/data';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  saveTestResults, 
  convertUserAnswer 
} from '@/components/task-bank/user-statistics/statistics-service';
import { useAuth } from '@/components/auth/AuthContext';

export const useTestSolver = (testId: string | undefined) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState<SavedTest | null>(null);
  const [taskDetails, setTaskDetails] = useState<TaskOption[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [pdfOptions, setPdfOptions] = useState<TestGenerationOptions>({
    includeExplanations: false,
    includeAnswerKey: false
  });
  const [resultsMode, setResultsMode] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showStatistics, setShowStatistics] = useState(false);
  
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
      
      const taskIds = parsedTest.tasks;
      const tasksDetails = taskIds.map(id => {
        const task = sampleTasks.find(t => t.id === id);
        if (!task) return null;
        
        const lineNumber = parseInt(task.line.replace('Линия ', ''), 10) || 0;
        const taskCode = `${lineNumber.toString().padStart(2, '0')}-${task.id.toString().padStart(3, '0')}`;
        
        return {
          id: task.id,
          taskCode: taskCode,
          title: task.title,
          line: task.line,
          selected: true
        };
      }).filter(Boolean) as TaskOption[];
      
      setTaskDetails(tasksDetails);
      
      // Initialize userAnswers with an empty string for 'answer'
      setUserAnswers(taskIds.map(id => ({ 
        taskId: id, 
        answer: '' // Ensure answer is always a string, not undefined
      })));
      
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
  
  const checkAllAnswers = () => {
    if (userAnswers.some(a => !a.answer?.trim())) {
      toast.error('Пожалуйста, ответьте на все вопросы перед проверкой');
      return;
    }
    
    let correctCount = 0;
    const checkedAnswers = userAnswers.map(userAnswer => {
      const task = sampleTasks.find(t => t.id === userAnswer.taskId) as ExtendedTask | undefined;
      const taskOption = taskDetails.find(t => t.id === userAnswer.taskId);
      
      if (!task) return userAnswer;
      
      const correctAnswersArray = task.correctAnswers || (task.correctAnswer ? [task.correctAnswer] : []);
      
      if (correctAnswersArray.length === 0) return userAnswer;
      
      const isCorrect = correctAnswersArray.some(
        answer => userAnswer.answer?.trim().toLowerCase() === answer.toLowerCase()
      );
      
      if (isCorrect) correctCount++;
      
      // Ensure we return an object that satisfies the UserAnswer interface
      return {
        taskId: userAnswer.taskId,
        answer: userAnswer.answer, // Make sure this is always present
        isCorrect,
        taskCode: taskOption?.taskCode,
        taskTitle: task.title,
        userAnswer: userAnswer.answer,
        correctAnswer: correctAnswersArray.join(' или '),
        points: isCorrect ? ((task as any).points || 1) : 0,
        maxPoints: (task as any).points || 1 
      } as UserAnswer;
    });
    
    setUserAnswers(checkedAnswers as UserAnswer[]);
    
    const currentScore = {
      correct: correctCount,
      total: userAnswers.length
    };
    
    setScore(currentScore);
    setResultsMode(true);
    setShowStatistics(true);
    
    if (test) {
      saveTestResults(
        test.id,
        test.name,
        checkedAnswers as UserAnswer[],
        user?.id
      );
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Calculate points instead of percentage
    const totalEarnedPoints = checkedAnswers.reduce((sum, answer) => 
      sum + (answer.isCorrect ? ((answer as any).points || 1) : 0), 0);
    
    const totalPossiblePoints = checkedAnswers.reduce((sum, answer) => 
      sum + ((answer as any).maxPoints || 1), 0);
    
    toast.success(`Тест завершен! Ваш результат: ${totalEarnedPoints} из ${totalPossiblePoints} баллов`);
    
    if (test) {
      try {
        import('@/components/task-bank/test-generator/pdfGenerator').then(module => {
          const taskOptions = taskDetails.map(task => ({
            ...task,
            selected: true
          }));
          
          module.generateTestPdf(
            test.name, 
            taskOptions, 
            {
              includeExplanations: true,
              includeAnswerKey: true
            },
            sampleTasks
          );
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        toast.error('Ошибка при генерации PDF');
      }
    }
  };
  
  return {
    test,
    taskDetails,
    userAnswers,
    pdfOptions,
    setPdfOptions,
    resultsMode,
    score,
    showStatistics,
    setShowStatistics,
    handleAnswerChange,
    checkAllAnswers
  };
};
