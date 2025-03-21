
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit2, Save, X, Share2, Copy, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Sample ready-made tests structure from ReadyMadeTests.tsx
const initialTests = [
  { id: 'ready-1', name: 'Вариант 1', taskIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 'ready-2', name: 'Вариант 2', taskIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { id: 'ready-3', name: 'Вариант 3', taskIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
  { id: 'ready-4', name: 'Вариант 4', taskIds: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
  { id: 'ready-5', name: 'Вариант 5', taskIds: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50] },
  { id: 'ready-6', name: 'Вариант 6', taskIds: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60] },
  { id: 'ready-7', name: 'Вариант 7', taskIds: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70] },
  { id: 'ready-8', name: 'Вариант 8', taskIds: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80] },
  { id: 'ready-9', name: 'Вариант 9', taskIds: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90] },
  { id: 'ready-10', name: 'Вариант 10', taskIds: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100] },
];

const ReadyMadeTestsEditor: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState(initialTests);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ id: '', name: '', taskIds: '' });

  const handleEdit = (test: any) => {
    setEditingId(test.id);
    setEditData({
      id: test.id,
      name: test.name,
      taskIds: test.taskIds.join(', ')
    });
  };

  const handleSave = (oldId: string) => {
    try {
      // Parse task IDs from comma-separated string
      const taskIdsArray = editData.taskIds
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id));

      if (taskIdsArray.length === 0) {
        toast.error('Необходимо указать хотя бы одно задание');
        return;
      }
      
      // Check if we need to update the ID
      const newId = editData.id.trim();
      if (!newId) {
        toast.error('ID не может быть пустым');
        return;
      }
      
      // Check if new ID already exists (but not the same as current)
      if (newId !== oldId && tests.some(t => t.id === newId)) {
        toast.error('Вариант с таким ID уже существует');
        return;
      }

      const updatedTests = tests.map(test => {
        if (test.id === oldId) {
          return {
            id: newId,
            name: editData.name || test.name,
            taskIds: taskIdsArray
          };
        }
        return test;
      });

      setTests(updatedTests);
      setEditingId(null);
      toast.success('Вариант успешно обновлен');

      // Here we would also update this in persistent storage in a real application
    } catch (error) {
      toast.error('Ошибка при сохранении варианта');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };
  
  const copyTestLink = (testId: string) => {
    const url = `${window.location.origin}/test-solver/${testId}`;
    navigator.clipboard.writeText(url);
    toast.success('Ссылка скопирована');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Редактирование готовых вариантов</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID варианта</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Задания</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                {editingId === test.id ? (
                  <>
                    <TableCell>
                      <Input
                        value={editData.id}
                        onChange={(e) => setEditData({ ...editData, id: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Label htmlFor="taskIds">ID заданий (через запятую)</Label>
                        <Input
                          id="taskIds"
                          value={editData.taskIds}
                          onChange={(e) => setEditData({ ...editData, taskIds: e.target.value })}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleSave(test.id)}>
                          <Save className="h-4 w-4 mr-1" />
                          Сохранить
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-1" />
                          Отмена
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="font-mono text-sm">{test.id}</TableCell>
                    <TableCell>{test.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {test.taskIds.length} заданий
                        <div className="text-xs text-muted-foreground mt-1">
                          ID: {test.taskIds.slice(0, 5).join(', ')}{test.taskIds.length > 5 ? '...' : ''}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(test)}>
                          <Edit2 className="h-4 w-4 mr-1" />
                          Изменить
                        </Button>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="flex-1 px-2" onClick={() => copyTestLink(test.id)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="flex-1 px-2"
                            onClick={() => navigate(`/test-solver/${test.id}`)}
                          >
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="flex-1 px-2"
                            onClick={() => {
                              copyTestLink(test.id);
                              toast.success('Ссылка скопирована для отправки');
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReadyMadeTestsEditor;
