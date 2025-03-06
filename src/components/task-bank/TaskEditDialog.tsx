
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Task } from './TaskCard';
import { getAllTopics, getAllSubtopics, topicStructure } from './data';
import { ImagePlus, X } from 'lucide-react';

interface TaskEditDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const TaskEditDialog: React.FC<TaskEditDialogProps> = ({ 
  task, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [topics, setTopics] = useState<string[]>([]);
  const [subtopics, setSubtopics] = useState<{id: string; name: string; parentTopic: string}[]>([]);
  const [filteredSubtopics, setFilteredSubtopics] = useState<{id: string; name: string; parentTopic: string}[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(task.imageUrl || null);

  // Load topics and subtopics
  useEffect(() => {
    setTopics(getAllTopics());
    setSubtopics(getAllSubtopics());
  }, []);

  // Filter subtopics based on selected topic
  useEffect(() => {
    if (editedTask.topic) {
      const filtered = subtopics.filter(
        subtopic => subtopic.parentTopic === editedTask.topic
      );
      setFilteredSubtopics(filtered);
    }
  }, [editedTask.topic, subtopics]);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEditedTask({ ...task });
      setImagePreview(task.imageUrl || null);
    }
  }, [isOpen, task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedTask(prev => ({ ...prev, [name]: value }));
    
    // When topic changes, reset subtopic
    if (name === 'topic') {
      setEditedTask(prev => ({ ...prev, subtopic: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setEditedTask(prev => ({ 
          ...prev, 
          imageUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setEditedTask(prev => ({ ...prev, imageUrl: undefined }));
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  // Generate task lines (lines of the ЕГЭ exam)
  const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать задание</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Название задания</Label>
              <Input 
                id="title" 
                name="title" 
                value={editedTask.title} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Сложность</Label>
              <Select 
                name="difficulty" 
                value={editedTask.difficulty} 
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
                value={editedTask.topic} 
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
                value={editedTask.subtopic || ''} 
                onValueChange={(value) => handleSelectChange('subtopic', value)}
                disabled={!editedTask.topic}
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
                value={editedTask.line} 
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
                value={editedTask.part} 
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
              value={editedTask.description} 
              onChange={handleChange} 
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="correctAnswer">Правильный ответ</Label>
            <Textarea 
              id="correctAnswer" 
              name="correctAnswer" 
              value={editedTask.correctAnswer || ''} 
              onChange={handleChange} 
              rows={2}
            />
          </div>
          
          <div>
            <Label>Изображение</Label>
            <div className="mt-2 flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('image-upload')?.click()}
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
                id="image-upload"
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
        
        <DialogFooter className="sticky bottom-0 bg-background pt-2">
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditDialog;
