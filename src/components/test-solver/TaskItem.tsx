
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle } from 'lucide-react';
import { ExtendedTask, UserAnswer } from '@/components/task-bank/test-generator/types';
import { TaskOption } from '@/components/task-bank/test-generator/types';

interface TaskItemProps {
  task: TaskOption;
  fullTask: ExtendedTask;
  index: number;
  userAnswer: UserAnswer | undefined;
  resultsMode: boolean;
  onAnswerChange: (taskId: number, value: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  fullTask, 
  index, 
  userAnswer, 
  resultsMode, 
  onAnswerChange 
}) => {
  const isAnswered = userAnswer?.isCorrect !== undefined;
  
  // Create corrected array of answers using either correctAnswers or correctAnswer
  const correctAnswersArray = fullTask.correctAnswers || 
    (fullTask.correctAnswer ? [fullTask.correctAnswer] : []);
  
  return (
    <Card className="shadow-sm">
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
            onChange={(e) => onAnswerChange(task.id, e.target.value)}
            className="resize-none"
            readOnly={resultsMode}
          />
        </div>
        
        {isAnswered && !userAnswer?.isCorrect && correctAnswersArray.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-1">Правильный ответ:</h4>
            <p className="text-sm text-blue-900">{correctAnswersArray[0]}</p>
          </div>
        )}
        
        {isAnswered && fullTask?.explanation && (
          <div className="mt-4 p-3 bg-purple-50 rounded-md">
            <h4 className="text-sm font-medium text-purple-800 mb-1">Пояснение:</h4>
            <p className="text-sm text-purple-900">{fullTask.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
