
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatisticsCardsProps {
  totalTests: number;
  totalAttemptedTasks: number;
  averageScore: number;
  userId?: string;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  totalTests,
  totalAttemptedTasks,
  averageScore,
  userId
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Решено вариантов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTests}</div>
          {userId && <div className="text-xs text-muted-foreground mt-1">ID пользователя: {userId}</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Решено заданий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAttemptedTasks}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Средний результат</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore}%</div>
          <Progress value={averageScore} className="h-2 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
