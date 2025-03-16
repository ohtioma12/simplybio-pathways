
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SolvedTest } from './statistics-service';

interface StatisticsCardsProps {
  solvedTests: SolvedTest[];
  totalPoints: number;
  totalPossiblePoints: number;
  overallPercentage: number;
  userId?: string;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  solvedTests,
  totalPoints,
  totalPossiblePoints,
  overallPercentage,
  userId
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Решено вариантов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{solvedTests.length}</div>
          <div className="text-xs text-muted-foreground mt-1">ID пользователя: {userId}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Набрано баллов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPoints} из {totalPossiblePoints}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Средний результат</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPoints} из {totalPossiblePoints}</div>
          <Progress value={overallPercentage} className="h-2 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
