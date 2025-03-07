
import { useState, useEffect } from 'react';
import { Task } from '@/components/task-bank/TaskCard';
import { getAllTopics, getAllSubtopics } from '@/components/task-bank/data';

export const useTaskForm = (initialTask: Task) => {
  // Ensure correctAnswers is an array
  const taskWithAnswers: Task = {
    ...initialTask,
    correctAnswers: initialTask.correctAnswers || 
      (initialTask.correctAnswer ? [initialTask.correctAnswer] : []),
    score: initialTask.score || 1
  };
  
  const [task, setTask] = useState<Task>({ ...taskWithAnswers });
  const [topics, setTopics] = useState<string[]>([]);
  const [subtopics, setSubtopics] = useState<{id: string; name: string; parentTopic: string}[]>([]);
  const [filteredSubtopics, setFilteredSubtopics] = useState<{id: string; name: string; parentTopic: string}[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(initialTask.imageUrl || null);

  // Load topics and subtopics
  useEffect(() => {
    setTopics(getAllTopics());
    setSubtopics(getAllSubtopics());
  }, []);

  // Filter subtopics based on selected topic
  useEffect(() => {
    if (task.topic) {
      const filtered = subtopics.filter(
        subtopic => subtopic.parentTopic === task.topic
      );
      setFilteredSubtopics(filtered);
    }
  }, [task.topic, subtopics]);

  // Update score based on line selection
  useEffect(() => {
    if (task.line) {
      const lineNumber = parseInt(task.line.replace('Линия ', ''), 10);
      
      // Set default score based on line number
      let defaultScore = 2;
      if ([1, 3, 4, 5, 9, 13].includes(lineNumber)) defaultScore = 1;
      if ([22, 23, 24, 25, 26, 27, 28].includes(lineNumber)) defaultScore = 3;
      
      setTask(prev => ({ ...prev, score: defaultScore }));
    }
  }, [task.line]);

  // Reset form with initial task data
  const resetForm = (taskData: Task) => {
    const formattedTask = {
      ...taskData,
      correctAnswers: taskData.correctAnswers || 
        (taskData.correctAnswer ? [taskData.correctAnswer] : []),
      score: taskData.score || 1
    };
    
    setTask(formattedTask);
    setImagePreview(taskData.imageUrl || null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'score') {
      setTask(prev => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setTask(prev => ({ ...prev, [name]: value }));
    }
    
    // When topic changes, reset subtopic
    if (name === 'topic') {
      setTask(prev => ({ ...prev, subtopic: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setTask(prev => ({ 
          ...prev, 
          imageUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setTask(prev => ({ ...prev, imageUrl: undefined }));
  };

  // Methods for handling multiple correct answers
  const addAnswerField = () => {
    setTask(prev => ({
      ...prev,
      correctAnswers: [...(prev.correctAnswers || []), '']
    }));
  };

  const removeAnswerField = (index: number) => {
    setTask(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers?.filter((_, i) => i !== index) || []
    }));
  };

  const updateAnswer = (index: number, value: string) => {
    setTask(prev => {
      const newAnswers = [...(prev.correctAnswers || [])];
      newAnswers[index] = value;
      return {
        ...prev,
        correctAnswers: newAnswers
      };
    });
  };

  return {
    task,
    topics,
    subtopics,
    filteredSubtopics,
    imagePreview,
    resetForm,
    handleChange,
    handleSelectChange,
    handleImageUpload,
    removeImage,
    addAnswerField,
    removeAnswerField,
    updateAnswer
  };
};
