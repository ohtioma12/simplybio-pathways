
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Нет доступных заданий</h3>
        <p className="text-muted-foreground text-sm text-center mt-2">
          В данный момент нет доступных заданий, соответствующих выбранным фильтрам.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
