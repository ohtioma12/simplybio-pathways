
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Task } from './TaskCard';
import ImageUpload from './ImageUpload';

interface TaskFormFieldsProps {
  task: Partial<Task>;
  topics: string[];
  filteredSubtopics: {id: string; name: string; parentTopic: string}[];
  imagePreview: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
}

const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  task,
  topics,
  filteredSubtopics,
  imagePreview,
  handleChange,
  handleSelectChange,
  handleImageUpload,
  removeImage
}) => {
  // Generate task lines (lines of the ЕГЭ exam)
  const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Название задания</Label>
          <Input 
            id="title" 
            name="title" 
            value={task.title} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <Label htmlFor="difficulty">Сложность</Label>
          <Select 
            name="difficulty" 
            value={task.difficulty} 
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
            value={task.topic} 
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
            value={task.subtopic || ''} 
            onValueChange={(value) => handleSelectChange('subtopic', value)}
            disabled={!task.topic}
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
            value={task.line} 
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
            value={task.part} 
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
          value={task.description} 
          onChange={handleChange} 
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="correctAnswer">Правильный ответ</Label>
        <Textarea 
          id="correctAnswer" 
          name="correctAnswer" 
          value={task.correctAnswer || ''} 
          onChange={handleChange} 
          rows={2}
        />
      </div>
      
      <div>
        <Label>Изображение</Label>
        <ImageUpload
          imagePreview={imagePreview}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
        />
      </div>
    </div>
  );
};

export default TaskFormFields;
