
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Mock data for task topics
const topics = [
  'Молекулярная биология',
  'Клетка как биологическая система',
  'Организм как биологическая система',
  'Система и многообразие органического мира',
  'Организм человека и его здоровье',
  'Эволюция живой природы',
  'Экосистемы и присущие им закономерности',
];

// Mock data for task lines (lines of the ЕГЭ exam)
const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

const UploadTaskButton: React.FC = () => {
  // Handle task upload (mock function)
  const handleTaskUpload = () => {
    toast.success('Задание успешно загружено!');
  };

  return (
    <div className="glass-card p-5 rounded-xl bg-gradient-to-br from-prosto-blue-light/30 to-transparent">
      <h3 className="font-medium mb-4">Добавить задание</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Загрузите новое задание в банк для ваших учеников
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Загрузить задание
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Загрузить новое задание</DialogTitle>
            <DialogDescription>
              Заполните информацию о новом задании для банка ЕГЭ
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Название задания</Label>
              <Input id="task-title" placeholder="Введите название задания" />
            </div>
            <div>
              <Label htmlFor="task-topic">Тема</Label>
              <Select>
                <SelectTrigger id="task-topic">
                  <SelectValue placeholder="Выберите тему" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="task-line">Линия задания</Label>
              <Select>
                <SelectTrigger id="task-line">
                  <SelectValue placeholder="Выберите линию" />
                </SelectTrigger>
                <SelectContent>
                  {taskLines.map(line => (
                    <SelectItem key={line} value={line}>
                      {line}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="task-part">Часть ЕГЭ</Label>
              <Select>
                <SelectTrigger id="task-part">
                  <SelectValue placeholder="Выберите часть" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Часть 1">Часть 1</SelectItem>
                  <SelectItem value="Часть 2">Часть 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="task-difficulty">Сложность</Label>
              <Select>
                <SelectTrigger id="task-difficulty">
                  <SelectValue placeholder="Выберите сложность" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Лёгкая">Лёгкая</SelectItem>
                  <SelectItem value="Средняя">Средняя</SelectItem>
                  <SelectItem value="Сложная">Сложная</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="task-description">Описание задания</Label>
              <Input id="task-description" placeholder="Введите содержание задания" />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Отмена</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleTaskUpload}>Загрузить</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadTaskButton;
