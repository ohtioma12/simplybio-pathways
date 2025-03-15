
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, FileText, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';
import { getUserSolvedTests } from '@/components/task-bank/user-statistics/statistics-service';

interface UserDetailsPopoverProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

const UserDetailsPopover: React.FC<UserDetailsPopoverProps> = ({ user }) => {
  const [role, setRole] = useState(user.role);
  const [open, setOpen] = useState(false);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    toast.success(`Роль пользователя ${user.name} изменена на ${newRole}`);
  };

  // Get user's solved tests
  const userSolvedTests = getUserSolvedTests(user.id);
  
  // Mock task statistics for the user
  const taskStatistics = [
    { id: 'Линия 1', correct: 84, wrong: 16 },
    { id: 'Линия 2', correct: 72, wrong: 28 },
    { id: 'Линия 3', correct: 45, wrong: 55 },
    { id: 'Линия 4', correct: 63, wrong: 37 },
    { id: 'Линия 5', correct: 89, wrong: 11 },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <UserCog className="h-4 w-4 mr-1" />
          Детали
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-medium">Email:</div>
            <div>{user.email}</div>
            <div className="font-medium">ID:</div>
            <div>{user.id}</div>
            <div className="font-medium">Дата регистрации:</div>
            <div>{user.createdAt}</div>
            <div className="font-medium">Роль:</div>
            <div>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Пользователь</SelectItem>
                  <SelectItem value="student">Ученик</SelectItem>
                  <SelectItem value="teacher">Учитель</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Tabs defaultValue="activity">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activity">
                  <FileText className="h-4 w-4 mr-1" />
                  Активность
                </TabsTrigger>
                <TabsTrigger value="performance">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Результаты
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="space-y-4 mt-2">
                <h4 className="text-sm font-medium">Решенные варианты: {userSolvedTests.length}</h4>
                <div className="max-h-40 overflow-y-auto">
                  {userSolvedTests.length > 0 ? (
                    <ul className="space-y-2">
                      {userSolvedTests.map((test) => (
                        <li key={test.testId} className="text-sm">
                          <div className="font-medium">{test.testName}</div>
                          <div className="text-muted-foreground text-xs">
                            Результат: {test.score.correct}/{test.score.total} ({Math.round((test.score.correct / test.score.total) * 100)}%)
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Нет решенных вариантов</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4 mt-2">
                <h4 className="text-sm font-medium">Статистика по линиям</h4>
                <div className="max-h-40 overflow-y-auto">
                  <ul className="space-y-2">
                    {taskStatistics.map((line) => (
                      <li key={line.id} className="text-sm">
                        <div className="flex justify-between">
                          <span>{line.id}</span>
                          <span>{line.correct}% верно</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${line.correct}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserDetailsPopover;
