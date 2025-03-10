
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TestResultsProps {
  score: {
    correct: number;
    total: number;
  };
}

const TestResults: React.FC<TestResultsProps> = ({ score }) => {
  return (
    <Card className="mb-6 bg-slate-50">
      <CardHeader>
        <CardTitle>Результаты</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-medium">
            Вы ответили правильно на {score.correct} из {score.total} вопросов
            ({Math.round((score.correct / score.total) * 100)}%)
          </p>
          <Progress 
            value={(score.correct / score.total) * 100} 
            className="h-2" 
          />
          <p className="text-sm text-muted-foreground">
            Ниже вы можете увидеть все свои ответы, правильные ответы и пояснения к заданиям.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResults;
