
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Subtopic {
  id: string;
  name: string;
}

interface Topic {
  id: number;
  name: string;
  subtopics: Subtopic[];
}

interface TopicFilterProps {
  topics: Topic[];
  selectedTopic: string | null;
  selectedSubtopic: string | null;
  onTopicSelect: (topic: string) => void;
  onSubtopicSelect: (subtopic: string) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({
  topics,
  selectedTopic,
  selectedSubtopic,
  onTopicSelect,
  onSubtopicSelect
}) => {
  // State for expanded topics in the list
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);

  // Toggle topic expansion
  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  return (
    <div className="border rounded-md p-2">
      <div className="max-h-[300px] overflow-y-auto pr-1">
        {topics.map(topic => (
          <div key={topic.id} className="mb-1">
            <div 
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedTopic === topic.name ? 'bg-prosto-blue-light/30 font-medium' : 'hover:bg-muted'
              }`}
            >
              <div 
                className="flex-1"
                onClick={() => onTopicSelect(topic.name)}
              >
                {topic.name}
              </div>
              <div 
                className="p-1 hover:bg-muted rounded-md cursor-pointer"
                onClick={() => toggleTopic(topic.id)}
              >
                {expandedTopics.includes(topic.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {expandedTopics.includes(topic.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 border-l pl-2 overflow-hidden"
                >
                  {topic.subtopics.map(subtopic => (
                    <div 
                      key={subtopic.id}
                      className={`p-1 my-1 text-sm rounded cursor-pointer ${
                        selectedSubtopic === subtopic.name ? 'bg-prosto-blue-light/20 font-medium' : 'hover:bg-muted'
                      }`}
                      onClick={() => {
                        onTopicSelect(topic.name);
                        onSubtopicSelect(subtopic.name);
                      }}
                    >
                      {subtopic.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicFilter;
