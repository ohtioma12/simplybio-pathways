
import React from 'react';
import { Button } from '@/components/ui/button';
import { Youtube, MessageSquare } from 'lucide-react';

const ResourcesHero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-prosto-blue-light/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Бесплатные вебинары и материалы</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Получите доступ к полезным ресурсам, которые помогут вам в подготовке к ЕГЭ по биологии
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="flex items-center gap-2" asChild>
              <a href="https://youtube.com/channel" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
                YouTube канал
              </a>
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://t.me/channel" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-5 w-5" />
                Telegram канал
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
