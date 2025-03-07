
import React from 'react';
import { motion } from 'framer-motion';

interface FilterSummaryProps {
  selectedTopic: string | null;
  selectedSubtopic: string | null;
  selectedLine: string | null;
  selectedPart: string | null;
}

const FilterSummary: React.FC<FilterSummaryProps> = ({
  selectedTopic,
  selectedSubtopic,
  selectedLine,
  selectedPart
}) => {
  if (!selectedTopic && !selectedSubtopic && !selectedLine && !selectedPart) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-xs text-muted-foreground pt-2 border-t"
    >
      <div className="font-medium mb-1">Активные фильтры:</div>
      <ul className="list-disc list-inside">
        {selectedTopic && <li>Тема: {selectedTopic}</li>}
        {selectedSubtopic && <li>Подтема: {selectedSubtopic}</li>}
        {selectedLine && <li>Линия: {selectedLine}</li>}
        {selectedPart && <li>Часть: {selectedPart}</li>}
      </ul>
    </motion.div>
  );
};

export default FilterSummary;
