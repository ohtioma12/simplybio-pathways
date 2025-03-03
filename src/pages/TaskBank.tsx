
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, BookOpen, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ConsultationButton from '@/components/ui/ConsultationButton';
import { toast } from 'sonner';

// Mock data for task topics
const topics = [
  'Молекулярная биология',
  'Клетка как биологическая система',
  'Организм как биологическая система',
  'Система и многообразие органического мира',
  'Организм человека и его здоровье',
  'Эволюция живой природы',
  'Экосистемы и присущие им закономерности',
];

// Mock data for task lines (lines of the ЕГЭ exam)
const taskLines = Array.from({ length: 28 }, (_, i) => `Линия ${i + 1}`);

// Sample tasks
const sampleTasks = [
  {
    id: 1,
    title: 'Задание по молекулярной биологии',
    topic: 'Молекулярная биология',
    line: 'Линия 4',
    part: 'Часть 1',
    difficulty: 'Средняя',
    description: 'Установите соответствие между характеристиками и уровнями организации живого...',
  },
  {
    id: 2,
    title: 'Анализ биологической информации',
    topic: 'Клетка как биологическая система',
    line: 'Линия 8',
    part: 'Часть 1',
    difficulty: 'Лёгкая',
    description: 'Найдите три ошибки в приведённом тексте. Укажите номера предложений, в которых сделаны ошибки...',
  },
  {
    id: 3,
    title: 'Решение задачи по генетике',
    topic: 'Организм как биологическая система',
    line: 'Линия 27',
    part: 'Часть 2',
    difficulty: 'Сложная',
    description: 'У человека альбинизм (отсутствие пигментации) обусловлен аутосомным рецессивным геном...',
  },
  {
    id: 4,
    title: 'Анатомия кровеносной системы',
    topic: 'Организм человека и его здоровье',
    line: 'Линия 12',
    part: 'Часть 1',
    difficulty: 'Средняя',
    description: 'Установите соответствие между кровеносными сосудами и их характеристиками...',
  },
  {
    id: 5,
    title: 'Вопросы на основы экологии',
    topic: 'Экосистемы и присущие им закономерности',
    line: 'Линия 15',
    part: 'Часть 1',
    difficulty: 'Лёгкая',
    description: 'Выберите три верных ответа из шести и запишите цифры, под которыми они указаны...',
  },
  {
    id: 6,
    title: 'Теория эволюции Дарвина',
    topic: 'Эволюция живой природы',
    line: 'Линия 19',
    part: 'Часть 1',
    difficulty: 'Средняя',
    description: 'Установите последовательность этапов эволюционного процесса согласно теории Дарвина...',
  },
];

const TaskBank = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [tasks, setTasks] = useState(sampleTasks);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || task.topic === selectedTopic;
    const matchesLine = !selectedLine || task.line === selectedLine;
    const matchesPart = !selectedPart || task.part === selectedPart;
    
    return matchesSearch && matchesTopic && matchesLine && matchesPart;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic(null);
    setSelectedLine(null);
    setSelectedPart(null);
  };

  // Handle task upload (mock function)
  const handleTaskUpload = () => {
    toast.success('Задание успешно загружено!');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-prosto-blue-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Банк заданий ЕГЭ по биологии</h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Практикуйтесь с заданиями разных типов и уровней сложности, чтобы лучше подготовиться к экзамену
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ConsultationButton size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Task Bank Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-8"
            >
              <div className="glass-card p-5 rounded-xl">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-medium flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтры
                  </h3>
                  {(selectedTopic || selectedLine || selectedPart) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetFilters}
                      className="text-muted-foreground text-xs"
                    >
                      Сбросить
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Topic filter */}
                  <div>
                    <Label htmlFor="topic">Тема</Label>
                    <Select
                      value={selectedTopic || ""}
                      onValueChange={value => setSelectedTopic(value || null)}
                    >
                      <SelectTrigger id="topic">
                        <SelectValue placeholder="Выберите тему" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все темы</SelectItem>
                        {topics.map(topic => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Line filter */}
                  <div>
                    <Label htmlFor="line">Линия задания</Label>
                    <Select
                      value={selectedLine || ""}
                      onValueChange={value => setSelectedLine(value || null)}
                    >
                      <SelectTrigger id="line">
                        <SelectValue placeholder="Выберите линию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все линии</SelectItem>
                        {taskLines.map(line => (
                          <SelectItem key={line} value={line}>
                            {line}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Part filter */}
                  <div>
                    <Label htmlFor="part">Часть ЕГЭ</Label>
                    <Select
                      value={selectedPart || ""}
                      onValueChange={value => setSelectedPart(value || null)}
                    >
                      <SelectTrigger id="part">
                        <SelectValue placeholder="Выберите часть" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все части</SelectItem>
                        <SelectItem value="Часть 1">Часть 1</SelectItem>
                        <SelectItem value="Часть 2">Часть 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Upload new task section (for admin/teacher) */}
              <div className="glass-card p-5 rounded-xl bg-gradient-to-br from-prosto-blue-light/30 to-transparent">
                <h3 className="font-medium mb-4">Добавить задание</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Загрузите новое задание в банк для ваших учеников
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Загрузить задание
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Загрузить новое задание</DialogTitle>
                      <DialogDescription>
                        Заполните информацию о новом задании для банка ЕГЭ
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="task-title">Название задания</Label>
                        <Input id="task-title" placeholder="Введите название задания" />
                      </div>
                      <div>
                        <Label htmlFor="task-topic">Тема</Label>
                        <Select>
                          <SelectTrigger id="task-topic">
                            <SelectValue placeholder="Выберите тему" />
                          </SelectTrigger>
                          <SelectContent>
                            {topics.map(topic => (
                              <SelectItem key={topic} value={topic}>
                                {topic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="task-line">Линия задания</Label>
                        <Select>
                          <SelectTrigger id="task-line">
                            <SelectValue placeholder="Выберите линию" />
                          </SelectTrigger>
                          <SelectContent>
                            {taskLines.map(line => (
                              <SelectItem key={line} value={line}>
                                {line}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="task-part">Часть ЕГЭ</Label>
                        <Select>
                          <SelectTrigger id="task-part">
                            <SelectValue placeholder="Выберите часть" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Часть 1">Часть 1</SelectItem>
                            <SelectItem value="Часть 2">Часть 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="task-difficulty">Сложность</Label>
                        <Select>
                          <SelectTrigger id="task-difficulty">
                            <SelectValue placeholder="Выберите сложность" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Лёгкая">Лёгкая</SelectItem>
                            <SelectItem value="Средняя">Средняя</SelectItem>
                            <SelectItem value="Сложная">Сложная</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="task-description">Описание задания</Label>
                        <Input id="task-description" placeholder="Введите содержание задания" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleTaskUpload}>Загрузить</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Tasks list */}
            <div className="lg:col-span-9">
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-2xl font-bold">Задания ({filteredTasks.length})</h2>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Поиск заданий..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover-lift">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{task.title}</CardTitle>
                              <CardDescription>{task.line} • {task.part}</CardDescription>
                            </div>
                            <div className="text-xs font-medium px-2.5 py-1 bg-prosto-blue-light/50 text-prosto-blue rounded-full">
                              {task.difficulty}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <span className="text-xs text-muted-foreground">{task.topic}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedTask(task)}
                              >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Открыть
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>{selectedTask?.title}</DialogTitle>
                                <DialogDescription>
                                  {selectedTask?.line} • {selectedTask?.part} • {selectedTask?.difficulty}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Тема</h4>
                                  <p className="text-sm text-muted-foreground">{selectedTask?.topic}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Содержание задания</h4>
                                  <p className="text-sm">{selectedTask?.description}</p>
                                </div>
                                <div className="pt-4 flex justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Скачать
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center glass-card rounded-xl">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Задания не найдены</h3>
                  <p className="text-muted-foreground mb-6">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                  <Button onClick={resetFilters}>Сбросить все фильтры</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Нужна помощь с подготовкой?</h2>
            <p className="text-lg mb-8 text-balance">
              Запишитесь на бесплатную консультацию, и мы расскажем, как наши курсы помогут вам успешно сдать ЕГЭ
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskBank;
