
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsultationButton from '@/components/ui/ConsultationButton';

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-prosto-blue-light/20 to-transparent -z-10"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Подготовка к ЕГЭ по биологии <span className="text-prosto-blue">ПроСТО</span> и эффективно
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-xl"
              >
                Курсы, которые помогут вам разобраться в сложных темах и успешно сдать экзамен с высоким баллом.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <ConsultationButton size="lg" />
                <Button variant="outline" size="lg" asChild>
                  <Link to="/task-bank">
                    Банк заданий
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Студенты на занятии по биологии" 
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-subtle p-4">
                  <div className="text-3xl font-bold text-prosto-blue">98%</div>
                  <div className="text-sm text-muted-foreground">сдают на 80+ баллов</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают наши курсы</h2>
            <p className="text-muted-foreground text-lg">
              Наша методика обучения разработана для достижения максимального результата
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-prosto-blue" />,
                title: 'Структурированные материалы',
                description: 'Все темы и задания систематизированы в удобном формате для эффективного обучения.'
              },
              {
                icon: <User className="h-8 w-8 text-prosto-blue" />,
                title: 'Опытные преподаватели',
                description: 'Наши педагоги имеют многолетний опыт подготовки к ЕГЭ и знают все тонкости экзамена.'
              },
              {
                icon: <Video className="h-8 w-8 text-prosto-blue" />,
                title: 'Онлайн и офлайн формат',
                description: 'Выбирайте удобный формат обучения: онлайн уроки или занятия в группе.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl hover-lift"
              >
                <div className="bg-prosto-blue-light/50 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 md:py-24 bg-prosto-blue-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Обучение биологии" 
                className="rounded-2xl shadow-subtle"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Программа курса</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Наша программа покрывает все темы, необходимые для успешной сдачи ЕГЭ по биологии
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Молекулярная биология и биохимия',
                  'Клетка как биологическая система',
                  'Организм как биологическая система',
                  'Система и многообразие органического мира',
                  'Организм человека и его здоровье',
                  'Эволюция живой природы',
                  'Экосистемы и присущие им закономерности'
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 rounded-full bg-prosto-blue-light/50 p-1 mr-3">
                      <Check className="h-5 w-5 text-prosto-blue" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

              <ConsultationButton />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что говорят наши ученики</h2>
            <p className="text-muted-foreground text-lg">
              Отзывы тех, кто уже успешно сдал ЕГЭ по биологии с нашей помощью
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна К.',
                score: '95 баллов',
                text: 'Благодаря курсам я смогла систематизировать свои знания и восполнить пробелы. Очень помог банк заданий, где можно отработать разные типы вопросов.'
              },
              {
                name: 'Максим Д.',
                score: '92 балла',
                text: 'Преподаватели объясняют сложные темы простым языком. Особенно понравились онлайн-консультации, где можно задать все волнующие вопросы.'
              },
              {
                name: 'Елена П.',
                score: '89 баллов',
                text: 'ПроСТО помогли мне освоить молекулярную биологию, которая всегда была сложной. Теперь я учусь в медицинском вузе на бюджете!'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-prosto-blue">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-4">{testimonial.text}</p>
                <div className="flex justify-between items-center">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-prosto-blue font-semibold">{testimonial.score}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/reviews">
                Смотреть все отзывы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы начать подготовку к ЕГЭ?</h2>
            <p className="text-lg mb-8 text-balance">
              Запишитесь на бесплатную консультацию и узнайте, как наши курсы могут помочь именно вам
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
