
import { useState, useEffect } from 'react';
import { Task } from '@/components/task-bank/TaskCard';
import { getAllTopics, getAllSubtopics } from '@/components/task-bank/data';

export const useTaskForm = (initialTask: Task) => {
  const [task, setTask] = useState<Task>({ ...initialTask });
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

  // Reset form with initial task data
  const resetForm = (taskData: Task) => {
    setTask({ ...taskData });
    setImagePreview(taskData.imageUrl || null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setTask(prev => ({ ...prev, [name]: value }));
    
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
    removeImage
  };
};
