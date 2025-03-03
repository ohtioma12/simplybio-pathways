
import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Material {
  id: number;
  title: string;
  description: string;
  type: string;
  size: string;
  icon: React.ReactNode;
  tags: string[];
}

interface ResourcesMaterialsProps {
  materials: Material[];
}

const ResourcesMaterials: React.FC<ResourcesMaterialsProps> = ({ materials }) => {
  return (
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
                  {material.icon}
                </div>
                <Badge variant="outline">{material.type}</Badge>
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
  );
};

export default ResourcesMaterials;
