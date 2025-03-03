
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourcesWebinars from './ResourcesWebinars';
import ResourcesMaterials from './ResourcesMaterials';
import { webinars, materials } from './ResourcesData';

const ResourcesContent: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs defaultValue="webinars" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="webinars">Вебинары</TabsTrigger>
              <TabsTrigger value="materials">Материалы</TabsTrigger>
            </TabsList>
          </div>

          {/* Webinars Tab */}
          <TabsContent value="webinars">
            <ResourcesWebinars webinars={webinars} />
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href="https://youtube.com/channel" target="_blank" rel="noopener noreferrer">
                  Смотреть все вебинары
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <ResourcesMaterials materials={materials} />
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href="https://t.me/channel" target="_blank" rel="noopener noreferrer">
                  Больше материалов в Telegram
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourcesContent;
