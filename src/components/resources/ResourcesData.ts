
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Webinar } from './ResourcesWebinars';
import { Material } from './ResourcesMaterials';

// Webinars data
export const webinars: Webinar[] = [
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

// Materials data
export const materials: Material[] = [
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
