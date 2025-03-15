
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserSolvedTests } from '@/components/task-bank/user-statistics/statistics-service';
import { getUserTests } from '@/components/task-bank/test-generator/pdfGenerator';
import { sampleTasks } from '@/components/task-bank/data';

// User stats data for admin dashboard
const userStatistics = [
  { name: 'Иван', completedTests: 4, avgScore: 78 },
  { name: 'Мария', completedTests: 7, avgScore: 92 },
  { name: 'Алексей', completedTests: 3, avgScore: 65 },
  { name: 'Одиссей', completedTests: 12, avgScore: 88 },
  { name: 'Елена', completedTests: 6, avgScore: 71 },
];

// Task difficulty data for admin dashboard
const taskStatistics = [
  { id: 'Линия 1', correct: 84, wrong: 16 },
  { id: 'Линия 2', correct: 72, wrong: 28 },
  { id: 'Линия 3', correct: 45, wrong: 55 },
  { id: 'Линия 4', correct: 63, wrong: 37 },
  { id: 'Линия 5', correct: 89, wrong: 11 },
  { id: 'Линия 6', correct: 37, wrong: 63 },
  { id: 'Линия 7', correct: 58, wrong: 42 },
];

const AdminDashboard: React.FC = () => {
  const [totalTests, setTotalTests] = React.useState(0);
  const [totalTasks, setTotalTasks] = React.useState(0);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalSolvedTests, setTotalSolvedTests] = React.useState(0);
  
  React.useEffect(() => {
    // Calculate statistics
    setTotalTests(getUserTests().length);
    setTotalTasks(sampleTasks.length);
    setTotalUsers(6); // Mock value
    setTotalSolvedTests(getUserSolvedTests().length);
  }, []);
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Панель администратора</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего заданий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Сгенерировано вариантов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTests}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Решено вариантов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSolvedTests}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="tasks">Задания</TabsTrigger>
          <TabsTrigger value="performance">Производительность</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Статистика пользователей</CardTitle>
              <CardDescription>
                Количество решенных вариантов и средний балл
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={userStatistics}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completedTests" name="Решено вариантов" fill="#8884d8" />
                  <Bar dataKey="avgScore" name="Средний балл" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Сложность заданий</CardTitle>
              <CardDescription>
                Процент правильных/неправильных ответов по линиям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={taskStatistics}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  stackOffset="expand"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="correct" name="Правильные ответы (%)" fill="#82ca9d" stackId="a" />
                  <Bar dataKey="wrong" name="Неправильные ответы (%)" fill="#ff8042" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Системная производительность</CardTitle>
              <CardDescription>
                Количество пользователей и активность на сайте
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { day: 'Пн', visitors: 120, tests: 45 },
                    { day: 'Вт', visitors: 140, tests: 62 },
                    { day: 'Ср', visitors: 180, tests: 58 },
                    { day: 'Чт', visitors: 160, tests: 48 },
                    { day: 'Пт', visitors: 190, tests: 38 },
                    { day: 'Сб', visitors: 210, tests: 80 },
                    { day: 'Вс', visitors: 250, tests: 96 },
                  ]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" name="Посетители" fill="#8884d8" />
                  <Bar dataKey="tests" name="Решено вариантов" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
