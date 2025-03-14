
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
import { saveTestResults } from '@/components/task-bank/user-statistics/statistics-service';
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
        
        // Generate taskCode
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
  
  const checkAllAnswers = () => {
    if (userAnswers.some(a => !a.answer.trim())) {
      toast.error('Пожалуйста, ответьте на все вопросы перед проверкой');
      return;
    }
    
    let correctCount = 0;
    const checkedAnswers = userAnswers.map(userAnswer => {
      const task = sampleTasks.find(t => t.id === userAnswer.taskId) as ExtendedTask | undefined;
      const taskOption = taskDetails.find(t => t.id === userAnswer.taskId);
      
      if (!task) return userAnswer;
      
      // Check against correctAnswers array if it exists, or use correctAnswer as fallback
      const correctAnswersArray = task.correctAnswers || (task.correctAnswer ? [task.correctAnswer] : []);
      
      if (correctAnswersArray.length === 0) return userAnswer;
      
      const isCorrect = correctAnswersArray.some(
        answer => userAnswer.answer.trim().toLowerCase() === answer.toLowerCase()
      );
      
      if (isCorrect) correctCount++;
      
      // Format for statistics
      return { 
        taskId: userAnswer.taskId,
        taskCode: taskOption?.taskCode,
        taskTitle: task.title,
        userAnswer: userAnswer.answer,
        correctAnswer: correctAnswersArray.join(' или '),
        isCorrect,
        points: isCorrect ? ((task as any).points || 1) : 0,
        maxPoints: (task as any).points || 1 
      };
    });
    
    setUserAnswers(checkedAnswers);
    
    const currentScore = {
      correct: correctCount,
      total: userAnswers.length
    };
    
    setScore(currentScore);
    setResultsMode(true);
    
    // Save results to user statistics
    if (test) {
      saveTestResults(
        test.id,
        test.name,
        checkedAnswers,
        user?.id
      );
    }
    
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show toast with result
    const percentage = Math.round((correctCount / userAnswers.length) * 100);
    toast.success(`Тест завершен! Ваш результат: ${correctCount} из ${userAnswers.length} (${percentage}%)`);
  };
  
  return {
    test,
    taskDetails,
    userAnswers,
    pdfOptions,
    setPdfOptions,
    resultsMode,
    score,
    handleAnswerChange,
    checkAllAnswers
  };
};
