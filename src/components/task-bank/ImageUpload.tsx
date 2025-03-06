
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploadProps {
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imagePreview, 
  onImageUpload, 
  onRemoveImage 
}) => {
  return (
    <div>
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
            onClick={onRemoveImage}
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
          onChange={onImageUpload}
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
  );
};

export default ImageUpload;
