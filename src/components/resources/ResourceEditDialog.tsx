
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Webinar } from './ResourcesWebinars';
import { Material } from './ResourcesMaterials';

interface ResourceEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: Webinar | Material) => void;
  resource: Webinar | Material;
  type: 'webinar' | 'material';
}

const ResourceEditDialog: React.FC<ResourceEditDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  resource,
  type
}) => {
  const [formData, setFormData] = useState<any>(resource);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tags = tagString.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData((prev: any) => ({ ...prev, tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success(`${type === 'webinar' ? 'Вебинар' : 'Материал'} успешно обновлен`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {type === 'webinar' ? 'Редактирование вебинара' : 'Редактирование материала'}
            </DialogTitle>
            <DialogDescription>
              Внесите изменения и нажмите "Сохранить" для обновления
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            {type === 'webinar' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Продолжительность</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preview">URL превью</Label>
                  <Input
                    id="preview"
                    name="preview"
                    value={formData.preview}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">URL вебинара</Label>
                  <Input
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            
            {type === 'material' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="type">Тип</Label>
                  <Input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">URL материала</Label>
                  <Input
                    id="url"
                    name="url"
                    value={formData.url || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/material.pdf"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="tags">Теги (через запятую)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Отмена</Button>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceEditDialog;
