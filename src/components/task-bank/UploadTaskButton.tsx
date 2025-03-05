
import React, { useState, useEffect } from 'react';
import { Plus, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Task } from './TaskCard';
import { getAllTopics, getAllSubtopics } from './data';

interface UploadTaskButtonProps {
  onTaskAdd?: (newTask: Task) => void;
}

const UploadTaskButton: React.FC<UploadTaskButtonProps> = ({ onTaskAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    topic: '',
    subtopic: '',
    line: '',
    part: '',
    difficulty: '',
    description: '',
    correctAnswer: '',
  });
  const [topics, setTopics] = useState<string[]>([]);
  const [subtopics, setSubtopics] = useState<{id: string; name: string; parentTopic: string}[]>([]);
  const [filteredSubtopics, setFilteredSubtopics] = useState<{id: string; name: string; parentTopic: string}[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load topics and subtopics
  useEffect(() => {
    setTopics(getAllTopics());
    setSubtopics(getAllSubtopics());
  }, []);

  // Filter subtopics based on selected topic
  useEffect(() => {
    if (newTask.topic) {
      const filtered = subtopics.filter(
        subtopic => subtopic.parentTopic === newTask.topic
      );
      setFilteredSubtopics(filtered);
    }
  }, [newTask.topic, subtopics]);

  const resetForm = () => {
    setNewTask({
      title: '',
      topic: '',
      subtopic: '',
      line: '',
      part: '',
      difficulty: '',
      description: '',
      correctAnswer: '',
    });
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTask(prev => ({ ...prev, [name]: value }));
    
    // When topic changes, reset subtopic
    if (name === 'topic') {
      setNewTask(prev => ({ ...prev, subtopic: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewTask(prev => ({ 
          ...prev, 
          imageUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setNewTask(prev => {
      const { imageUrl, ...rest } = prev;
      return rest;
    });
  };

  const handleTaskUpload = () => {
    // Validate required fields
    if (!newTask.title || !newTask.topic || !newTask.difficulty || !newTask.description) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Create task and add it
    if (onTaskAdd) {
      onTaskAdd(newTask as Task);
      setIsOpen(false);
      resetForm();
    } else {
      toast.success('Задание успешно загружено!');
      setIsOpen(false);
      resetForm();
    }
  };

  // Generate task lines (lines of the ЕГЭ exam)
  const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

  return (
    <div className="glass-card p-5 rounded-xl bg-gradient-to-br from-prosto-blue-light/30 to-transparent">
      <h3 className="font-medium mb-4">Добавить задание</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Загрузите новое задание в банк для ваших учеников
      </p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Загрузить задание
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Загрузить новое задание</DialogTitle>
            <DialogDescription>
              Заполните информацию о новом задании для банка ЕГЭ
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Название задания</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={newTask.title} 
                  onChange={handleChange} 
                  placeholder="Введите название задания"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Сложность</Label>
                <Select 
                  name="difficulty" 
                  value={newTask.difficulty || ''} 
                  onValueChange={(value) => handleSelectChange('difficulty', value)}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Выберите сложность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Лёгкая">Лёгкая</SelectItem>
                    <SelectItem value="Средняя">Средняя</SelectItem>
                    <SelectItem value="Сложная">Сложная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="topic">Тема</Label>
                <Select 
                  name="topic" 
                  value={newTask.topic || ''} 
                  onValueChange={(value) => handleSelectChange('topic', value)}
                >
                  <SelectTrigger id="topic">
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
                <Label htmlFor="subtopic">Подтема</Label>
                <Select 
                  name="subtopic" 
                  value={newTask.subtopic || ''} 
                  onValueChange={(value) => handleSelectChange('subtopic', value)}
                  disabled={!newTask.topic}
                >
                  <SelectTrigger id="subtopic">
                    <SelectValue placeholder="Выберите подтему" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSubtopics.map(subtopic => (
                      <SelectItem key={subtopic.id} value={subtopic.name}>
                        {subtopic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="line">Линия задания</Label>
                <Select 
                  name="line" 
                  value={newTask.line || ''} 
                  onValueChange={(value) => handleSelectChange('line', value)}
                >
                  <SelectTrigger id="line">
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
                <Label htmlFor="part">Часть ЕГЭ</Label>
                <Select 
                  name="part" 
                  value={newTask.part || ''} 
                  onValueChange={(value) => handleSelectChange('part', value)}
                >
                  <SelectTrigger id="part">
                    <SelectValue placeholder="Выберите часть" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Часть 1">Часть 1</SelectItem>
                    <SelectItem value="Часть 2">Часть 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Содержание задания</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={newTask.description} 
                onChange={handleChange} 
                placeholder="Введите содержание задания" 
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="correctAnswer">Правильный ответ</Label>
              <Textarea 
                id="correctAnswer" 
                name="correctAnswer" 
                value={newTask.correctAnswer || ''} 
                onChange={handleChange} 
                placeholder="Введите правильный ответ" 
                rows={2}
              />
            </div>
            
            <div>
              <Label>Изображение</Label>
              <div className="mt-2 flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('upload-image')?.click()}
                  className="flex items-center gap-2"
                >
                  <ImagePlus className="h-4 w-4" />
                  {imagePreview ? 'Изменить изображение' : 'Добавить изображение'}
                </Button>
                {imagePreview && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={removeImage}
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Удалить
                  </Button>
                )}
                <input
                  id="upload-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {imagePreview && (
                <div className="mt-3 border rounded-md p-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-48 w-auto mx-auto rounded"
                  />
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetForm}>Отмена</Button>
            </DialogClose>
            <Button onClick={handleTaskUpload}>Загрузить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadTaskButton;
