
import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, MessageSquare, Calendar, ArrowRight, Video, Clock, BookOpen, Download } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConsultationButton from '@/components/ui/ConsultationButton';

// Mock data for webinars
const webinars = [
  {
    id: 1,
    title: 'Структура ЕГЭ по биологии 2024: что ожидать и как готовиться',
    description: 'Разбор формата экзамена, типов заданий и критериев оценивания. Советы по подготовке и планированию занятий.',
    date: '15 марта 2024',
    duration: '1 час 30 минут',
    preview: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com/watch?v=example1',
    tags: ['ЕГЭ 2024', 'Подготовка']
  },
  {
    id: 2,
    title: 'Молекулярная биология: сложные вопросы простыми словами',
    description: 'Разбор наиболее сложных тем раздела молекулярной биологии. Пошаговые алгоритмы решения задач по молекулярной генетике.',
    date: '28 февраля 2024',
    duration: '2 часа',
    preview: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com/watch?v=example2',
    tags: ['Молекулярная биология', 'Генетика']
  },
  {
    id: 3,
    title: 'Эволюция и экология: интересный подход к запоминанию',
    description: 'Методики запоминания сложных биологических терминов и концепций по эволюции и экологии. Практика решения линий 25 и 26.',
    date: '10 февраля 2024',
    duration: '1 час 45 минут',
    preview: 'https://images.unsplash.com/photo-1500354731738-5ada0fdf7c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com/watch?v=example3',
    tags: ['Эволюция', 'Экология', 'Мнемотехники']
  },
  {
    id: 4,
    title: 'Физиология человека: функциональные системы организма',
    description: 'Интегрированный подход к изучению физиологии человека. Сложные взаимосвязи между системами организма, разбор типичных ошибок.',
    date: '25 января 2024',
    duration: '2 часа 15 минут',
    preview: 'https://images.unsplash.com/photo-1559757175-7cb057fba903?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com/watch?v=example4',
    tags: ['Анатомия', 'Физиология', 'Системы организма']
  },
];

// Mock data for materials
const materials = [
  {
    id: 1,
    title: 'Шпаргалка по биохимии и молекулярной биологии',
    description: 'Компактный справочник с основными формулами, терминами и концепциями молекулярной биологии и биохимии.',
    type: 'PDF',
    size: '3.2 MB',
    icon: <BookOpen className="h-6 w-6 text-prosto-blue" />,
    tags: ['Шпаргалка', 'Молекулярная биология', 'Биохимия']
  },
  {
    id: 2,
    title: 'Таблица генетического кода и кодонов',
    description: 'Визуальное представление генетического кода с пояснениями и примерами использования при решении задач.',
    type: 'PDF',
    size: '1.8 MB',
    icon: <BookOpen className="h-6 w-6 text-prosto-blue" />,
    tags: ['Генетика', 'Справочник']
  },
  {
    id: 3,
    title: 'Интерактивная карта эволюционных процессов',
    description: 'Схема эволюционных взаимосвязей между основными группами организмов с ключевыми точками эволюционного развития.',
    type: 'PDF',
    size: '4.5 MB',
    icon: <BookOpen className="h-6 w-6 text-prosto-blue" />,
    tags: ['Эволюция', 'Карта']
  },
  {
    id: 4,
    title: 'Физиология человека в схемах и таблицах',
    description: 'Иллюстрированный справочник по всем системам организма человека, адаптированный для подготовки к ЕГЭ.',
    type: 'PDF',
    size: '6.7 MB',
    icon: <BookOpen className="h-6 w-6 text-prosto-blue" />,
    tags: ['Физиология', 'Анатомия', 'Схемы']
  },
  {
    id: 5,
    title: 'Сборник заданий по основам экологии',
    description: 'Практические задания с решениями по всем разделам экологии из ЕГЭ по биологии.',
    type: 'PDF',
    size: '5.3 MB',
    icon: <BookOpen className="h-6 w-6 text-prosto-blue" />,
    tags: ['Экология', 'Практика', 'Задания']
  },
  {
    id: 6,
    title: 'Полный справочник терминов для ЕГЭ по биологии',
    description: 'Словарь всех биологических терминов, встречающихся в ЕГЭ, с определениями и примерами использования.',
    type: 'PDF',
    size: '8.1 MB',
    icon: <BookOpen className="h-6 w-6 text-prosto-blue" />,
    tags: ['Словарь', 'Термины', 'Справочник']
  },
];

const Resources = () => {
  return (
    <>
      {/* Hero Section */}
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

      {/* Resources Tabs */}
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Узнайте больше о наших курсах</h2>
            <p className="text-lg mb-8 text-balance">
              Бесплатной консультации будет достаточно, чтобы понять, как наши курсы помогут именно вам
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
