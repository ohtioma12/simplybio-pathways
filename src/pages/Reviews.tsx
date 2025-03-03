
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ConsultationButton from '@/components/ui/ConsultationButton';

// Mock data for reviews
const reviews = [
  {
    id: 1,
    name: 'Анна К.',
    avatar: null,
    initials: 'АК',
    rating: 5,
    text: 'Я долго искала курсы для подготовки к ЕГЭ по биологии, перепробовала много разных вариантов, но только с "ПроСТО" я смогла разобраться в сложных темах. Методика преподавания очень понятная, задания подобраны от простого к сложному. Отдельно хочу отметить, что в банке заданий собраны все возможные типы вопросов, которые могут встретиться на экзамене.',
    date: '15 апреля 2024',
    tags: ['Поступила в МГУ', '95 баллов'],
    helpful: 42
  },
  {
    id: 2,
    name: 'Максим Д.',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    initials: 'МД',
    rating: 5,
    text: 'Подготовка была очень интенсивной, но в то же время эффективной. Мне особенно понравилось, что на курсах давали не только теорию, но и учили применять знания на практике. Прорабатывали все возможные типы заданий, что очень помогло на экзамене. Преподаватель всегда был на связи и отвечал на все вопросы. Бесплатные вебинары оказались тоже очень полезными, они помогли мне разобраться в сложных темах.',
    date: '3 марта 2024',
    tags: ['Поступил в СПбГУ', '92 балла'],
    helpful: 38
  },
  {
    id: 3,
    name: 'Елена П.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    initials: 'ЕП',
    rating: 5,
    text: 'До курсов "ПроСТО" я занималась самостоятельно, но поняла, что не могу разобраться в молекулярной биологии и генетике. На курсах мне всё объяснили настолько доступно, что теперь эти темы кажутся простыми! Банк заданий был просто спасением, я решала задания каждый день и видела свой прогресс. В итоге я поступила на бюджет в медицинский вуз, о чем всегда мечтала.',
    date: '12 февраля 2024',
    tags: ['Поступила в Первый МГМУ', '89 баллов'],
    helpful: 35
  },
  {
    id: 4,
    name: 'Дмитрий С.',
    avatar: null,
    initials: 'ДС',
    rating: 5,
    text: 'Я пришел на курсы с очень низким уровнем знаний по биологии, но за несколько месяцев смог подготовиться к экзамену и получить высокий балл. Преподаватели объясняют материал понятно и интересно, всегда готовы ответить на вопросы и помочь с трудными темами. Особенно понравились регулярные проверочные работы, которые помогали отслеживать прогресс и вовремя исправлять ошибки.',
    date: '25 января 2024',
    tags: ['Поступил в РУДН', '87 баллов'],
    helpful: 29
  },
  {
    id: 5,
    name: 'Софья М.',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    initials: 'СМ',
    rating: 5,
    text: 'Курсы "ПроСТО" - это не просто подготовка к ЕГЭ, это настоящая школа биологии. Здесь учат мыслить логически, анализировать информацию и применять знания на практике. Мне понравилось, что много внимания уделяется решению сложных задач по генетике и молекулярной биологии. Отдельное спасибо за мотивацию и поддержку на протяжении всего процесса подготовки!',
    date: '18 декабря 2023',
    tags: ['Поступила в РНИМУ', '90 баллов'],
    helpful: 31
  },
  {
    id: 6,
    name: 'Артем В.',
    avatar: null,
    initials: 'АВ',
    rating: 4,
    text: 'Хорошие курсы с профессиональными преподавателями. Материал объясняют доступно, много практики и разбора заданий. Единственное, хотелось бы больше индивидуального подхода и обратной связи по выполненным заданиям. В целом, рекомендую, особенно тем, кто хочет поступить в медицинский вуз.',
    date: '5 ноября 2023',
    tags: ['Поступил в КГМУ', '85 баллов'],
    helpful: 24
  },
  {
    id: 7,
    name: 'Ксения О.',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    initials: 'КО',
    rating: 5,
    text: 'Эти курсы полностью изменили мое отношение к биологии. Раньше я считала этот предмет сложным и скучным, но преподаватели смогли заинтересовать меня и показать, насколько увлекательна биология. Очень порадовало большое количество дополнительных материалов и возможность просматривать записи уроков. Я смогла поступить в вуз своей мечты!',
    date: '30 октября 2023',
    tags: ['Поступила в СибГМУ', '88 баллов'],
    helpful: 27
  },
];

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(4);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-prosto-blue-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Отзывы наших учеников</h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Узнайте, как наши курсы помогли студентам достичь высоких результатов на ЕГЭ по биологии
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-prosto-blue text-prosto-blue" />
                ))}
              </div>
              <span className="text-lg font-medium">4.9 из 5 на основе 142 отзывов</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.avatar || ''} alt={review.name} />
                          <AvatarFallback className="bg-prosto-blue text-white">
                            {review.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <CardDescription>{review.date}</CardDescription>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-prosto-blue text-prosto-blue'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.helpful} человек считают этот отзыв полезным</span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Страница {currentPage} из {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '95+', label: 'Средний балл' },
              { number: '500+', label: 'Выпускников' },
              { number: '98%', label: 'Поступают в вузы' },
              { number: '5/5', label: 'Рейтинг курсов' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center rounded-xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-prosto-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Review CTA */}
      <section className="py-16 md:py-24 bg-prosto-blue-light/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы стать нашим учеником?</h2>
            <p className="text-lg mb-8 text-balance">
              Присоединяйтесь к сотням успешных студентов, которые уже достигли высоких результатов с нашей помощью
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ConsultationButton size="lg" />
              <Button variant="outline" size="lg" asChild>
                <a href="https://t.me/channel" target="_blank" rel="noopener noreferrer">
                  <User className="mr-2 h-4 w-4" />
                  Истории успеха
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
