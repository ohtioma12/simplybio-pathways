
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Task } from '@/components/task-bank/TaskCard';

interface AnswerFormProps {
  task: Task;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ task }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
    setIsAnswerChecked(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error('Пожалуйста, введите ваш ответ');
      return;
    }

    if (!task?.correctAnswers && !task?.correctAnswer) {
      toast.error('Ошибка: для данного задания не указаны правильные ответы');
      return;
    }

    // Check if answer is correct using the array of correct answers
    const correctAnswersArray = task.correctAnswers || 
      (task.correctAnswer ? [task.correctAnswer] : []);
    
    const isCorrect = correctAnswersArray.some(
      answer => userAnswer.trim().toLowerCase() === answer.toLowerCase()
    ) || false;
    
    setIsAnswerCorrect(isCorrect);
    setIsAnswerChecked(true);
    
    if (isCorrect) {
      toast.success('Правильный ответ!');
      setShowExplanation(true); // Automatically show explanation on correct answer
    } else {
      toast.error('Неправильный ответ. Попробуйте еще раз.');
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Create corrected array of answers using either correctAnswers or correctAnswer
  const correctAnswersArray = task.correctAnswers || 
    (task.correctAnswer ? [task.correctAnswer] : []);

  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="Введите ваш ответ здесь..."
        className="mb-3"
        value={userAnswer}
        onChange={handleAnswerChange}
      />
      
      {isAnswerChecked && (
        <div className={`p-3 rounded-md mb-3 ${isAnswerCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className={`text-sm font-medium ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isAnswerCorrect 
              ? 'Правильно! Отличная работа.' 
              : `Неправильно. Попробуйте еще раз.`}
          </p>
        </div>
      )}
      
      {/* Explanation button is always available (even before solving) */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleExplanation} 
        className="w-full mb-3"
      >
        {showExplanation ? 'Скрыть объяснение' : 'Показать объяснение'}
      </Button>
      
      {/* Correct answer section */}
      {showExplanation && correctAnswersArray.length > 0 && (
        <div className="p-3 rounded-md mb-3 bg-blue-50">
          <h5 className="text-sm font-medium text-blue-700 mb-1">Правильный ответ:</h5>
          <p className="text-sm text-blue-800">{correctAnswersArray[0]}</p>
        </div>
      )}
      
      {/* Explanation section */}
      {showExplanation && task.explanation && (
        <div className="p-3 rounded-md mb-3 bg-purple-50">
          <h5 className="text-sm font-medium text-purple-700 mb-1">Объяснение:</h5>
          <p className="text-sm text-purple-800">{task.explanation}</p>
        </div>
      )}
      
      <div className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setUserAnswer('');
            setIsAnswerChecked(false);
          }}
        >
          Очистить
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={checkAnswer}
        >
          Проверить
        </Button>
      </div>
    </div>
  );
};

export default AnswerForm;
