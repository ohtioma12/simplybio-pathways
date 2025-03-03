
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  preview: string;
  url: string;
  tags: string[];
}

interface ResourcesWebinarsProps {
  webinars: Webinar[];
}

const ResourcesWebinars: React.FC<ResourcesWebinarsProps> = ({ webinars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {webinars.map((webinar, index) => (
        <motion.div
          key={webinar.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full overflow-hidden hover-lift">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={webinar.preview}
                alt={webinar.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-prosto-blue border-none font-normal">Бесплатно</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{webinar.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {webinar.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="h-4 w-4" /> {webinar.duration}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {webinar.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {webinar.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={webinar.url} target="_blank" rel="noopener noreferrer">
                  <Video className="h-4 w-4 mr-2" />
                  Смотреть на YouTube
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ResourcesWebinars;
