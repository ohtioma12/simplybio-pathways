
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserSolvedTests } from '@/components/task-bank/user-statistics/statistics-service';
import { getUserTests } from '@/components/task-bank/test-generator/pdfGenerator';
import { sampleTasks } from '@/components/task-bank/data';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, UserCog, FileText, BarChart2 } from 'lucide-react';
import UserDetailsPopover from './UserDetailsPopover';
import ReadyMadeTestsEditor from './ReadyMadeTestsEditor';

// Mock user data for the admin panel
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@prosto.ru', role: 'admin', createdAt: '2023-10-15' },
  { id: '2', name: 'Regular User', email: 'user@prosto.ru', role: 'user', createdAt: '2023-10-20' },
  { id: '3', name: 'Odissey', email: 'odibuda@mail.ru', role: 'admin', createdAt: '2023-11-05' },
  { id: '4', name: 'Teacher User', email: 'teacher@prosto.ru', role: 'teacher', createdAt: '2023-12-01' },
  { id: '5', name: 'Student User', email: 'student@prosto.ru', role: 'student', createdAt: '2024-01-10' },
  { id: '6', name: 'Odissey Scoot', email: 'odisseyscoot@icloud.com', role: 'user', createdAt: '2024-03-15' },
];

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'tests'>('users');
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.id.includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Панель администратора</h1>
      
      <div className="flex gap-4 mb-4">
        <Button
          variant={activeTab === 'users' ? 'default' : 'outline'}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </Button>
        <Button
          variant={activeTab === 'tests' ? 'default' : 'outline'}
          onClick={() => setActiveTab('tests')}
        >
          Редактор вариантов
        </Button>
      </div>
      
      {activeTab === 'users' ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Список пользователей</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, email или ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className="capitalize">{user.role}</span>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell>
                        <UserDetailsPopover user={user} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <ReadyMadeTestsEditor />
      )}
    </div>
  );
};

export default AdminDashboard;
