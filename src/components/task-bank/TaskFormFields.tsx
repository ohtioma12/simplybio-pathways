
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
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface TaskFormFieldsProps {
  task: Partial<Task>;
  topics: string[];
  filteredSubtopics: {id: string; name: string; parentTopic: string}[];
  imagePreview: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  addAnswerField: () => void;
  removeAnswerField: (index: number) => void;
  updateAnswer: (index: number, value: string) => void;
}

const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  task,
  topics,
  filteredSubtopics,
  imagePreview,
  handleChange,
  handleSelectChange,
  handleImageUpload,
  removeImage,
  addAnswerField,
  removeAnswerField,
  updateAnswer
}) => {
  // Generate task lines (lines of the ЕГЭ exam)
  const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);
  
  // Score options based on the line
  const getScoreOptions = () => {
    if (!task.line) return [1, 2, 3];
    
    const lineNumber = parseInt(task.line.replace('Линия ', ''), 10);
    
    // Based on the provided scoring table
    if ([1, 3, 4, 5, 9, 13].includes(lineNumber)) return [1];
    if ([2, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21].includes(lineNumber)) return [2];
    if ([22, 23, 24, 25, 26, 27, 28].includes(lineNumber)) return [3];
    
    return [1, 2, 3];
  };

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
            <SelectContent className="max-h-[200px] overflow-y-auto">
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
            <SelectContent className="max-h-[200px] overflow-y-auto">
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
            <SelectContent className="max-h-[200px] overflow-y-auto">
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
            <SelectContent className="max-h-[200px] overflow-y-auto">
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
            <SelectContent className="max-h-[200px] overflow-y-auto">
              <SelectItem value="Часть 1">Часть 1</SelectItem>
              <SelectItem value="Часть 2">Часть 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="score">Первичный балл</Label>
        <Select 
          name="score" 
          value={task.score?.toString() || '1'} 
          onValueChange={(value) => handleSelectChange('score', value)}
        >
          <SelectTrigger id="score">
            <SelectValue placeholder="Балл за задание" />
          </SelectTrigger>
          <SelectContent>
            {getScoreOptions().map(score => (
              <SelectItem key={score} value={score.toString()}>
                {score}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <div className="flex items-center justify-between mb-2">
          <Label>Правильные ответы</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addAnswerField}
          >
            <Plus className="h-4 w-4 mr-1" /> Добавить вариант
          </Button>
        </div>
        
        {task.correctAnswers && task.correctAnswers.length > 0 ? (
          <div className="space-y-2">
            {task.correctAnswers.map((answer, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={answer}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  placeholder={`Ответ ${index + 1}`}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeAnswerField(index)}
                  className="h-9 w-9 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mb-2">
            Нет вариантов ответа. Добавьте хотя бы один правильный ответ.
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="explanation">Объяснение задания</Label>
        <Textarea 
          id="explanation" 
          name="explanation" 
          value={task.explanation || ''} 
          onChange={handleChange} 
          rows={3}
          placeholder="Добавьте пояснение к правильному ответу..."
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
