
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePermissions } from '@/hooks/use-permissions';
import ResourceEditDialog from './ResourceEditDialog';

export interface Material {
  id: number;
  title: string;
  description: string;
  type: string;
  size: string;
  icon: () => JSX.Element;
  tags: string[];
}

interface ResourcesMaterialsProps {
  materials: Material[];
}

const ResourcesMaterials: React.FC<ResourcesMaterialsProps> = ({ materials: initialMaterials }) => {
  const { isAdmin } = usePermissions();
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  
  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
  };
  
  const handleSave = (updatedMaterial: Material) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(m => m.id === updatedMaterial.id ? updatedMaterial : m)
    );
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material, index) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-prosto-blue-light/50 p-3">
                    {material.icon()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{material.type}</Badge>
                    {isAdmin && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => handleEdit(material)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-4 text-lg">{material.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {material.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {material.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Размер: {material.size}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Скачать материал
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {editingMaterial && (
        <ResourceEditDialog 
          isOpen={!!editingMaterial}
          onClose={() => setEditingMaterial(null)}
          onSave={handleSave}
          resource={editingMaterial}
          type="material"
        />
      )}
    </>
  );
};

export default ResourcesMaterials;
