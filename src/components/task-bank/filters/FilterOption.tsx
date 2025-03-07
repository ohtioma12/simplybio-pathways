
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

interface FilterOptionProps {
  label: string;
  delay: number;
  children: React.ReactNode;
}

const FilterOption: React.FC<FilterOptionProps> = ({ label, delay, children }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      {children}
    </motion.div>
  );
};

export default FilterOption;
