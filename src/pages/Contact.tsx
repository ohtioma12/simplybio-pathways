
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import ConsultationButton from '@/components/ui/ConsultationButton';

const Contact = () => {
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-prosto-blue-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Остались вопросы? Мы готовы ответить на них и помочь вам с подготовкой к ЕГЭ по биологии
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ConsultationButton size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Напишите нам</CardTitle>
                  <CardDescription>
                    Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" placeholder="Ваше имя" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@mail.ru" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" placeholder="+7 (XXX) XXX-XX-XX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема</Label>
                      <Input id="subject" placeholder="Тема вашего сообщения" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        placeholder="Расскажите, как мы можем вам помочь"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Наши контакты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Mail className="h-5 w-5 text-prosto-blue" />,
                      title: 'Email',
                      details: 'info@prosto-bio.ru',
                      action: 'mailto:info@prosto-bio.ru',
                    },
                    {
                      icon: <Phone className="h-5 w-5 text-prosto-blue" />,
                      title: 'Телефон',
                      details: '+7 (XXX) XXX-XX-XX',
                      action: 'tel:+7XXXXXXXXXX',
                    },
                    {
                      icon: <MessageSquare className="h-5 w-5 text-prosto-blue" />,
                      title: 'Telegram',
                      details: '@prosto_bio',
                      action: 'https://t.me/prosto_bio',
                    },
                    {
                      icon: <MapPin className="h-5 w-5 text-prosto-blue" />,
                      title: 'Адрес',
                      details: 'г. Москва, ул. Примерная, д. 123',
                      action: 'https://maps.google.com',
                    },
                  ].map((item, index) => (
                    <Card key={index} className="hover-lift">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="bg-prosto-blue-light/50 p-3 rounded-full mb-4">
                          {item.icon}
                        </div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-muted-foreground mb-3">{item.details}</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-prosto-blue p-0"
                          asChild
                        >
                          <a href={item.action} target="_blank" rel="noopener noreferrer">
                            Связаться
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
                <div className="space-y-4">
                  {[
                    {
                      question: 'Как проходят занятия?',
                      answer:
                        'Занятия проходят как в онлайн, так и в офлайн формате. Вы можете выбрать удобный для вас вариант.',
                    },
                    {
                      question: 'Сколько стоят курсы?',
                      answer:
                        'Стоимость курсов зависит от выбранной программы и формата обучения. Для получения подробной информации запишитесь на бесплатную консультацию.',
                    },
                    {
                      question: 'Можно ли заниматься индивидуально?',
                      answer:
                        'Да, у нас есть возможность индивидуального обучения. Преподаватель составит программу исходя из ваших потребностей и уровня подготовки.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl">
                      <h3 className="font-medium mb-2">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-prosto-blue-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Как нас найти</h2>
            <p className="text-muted-foreground mb-0">
              Наш офис расположен в центре Москвы, недалеко от метро
            </p>
          </div>
          <div className="overflow-hidden rounded-xl shadow-subtle">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.1009826794977!2d37.617676!3d55.756939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1685440000000!5m2!1sru!2sru" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта расположения офиса"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы начать подготовку к ЕГЭ?</h2>
            <p className="text-lg mb-8 text-balance">
              Запишитесь на бесплатную консультацию и получите индивидуальный план подготовки
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
