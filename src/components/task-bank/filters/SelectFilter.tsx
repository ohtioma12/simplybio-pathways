
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectFilterProps {
  id: string;
  placeholder: string;
  value: string | null;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allValue: string;
  allLabel: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  id,
  placeholder,
  value,
  onChange,
  options,
  allValue,
  allLabel
}) => {
  return (
    <Select
      value={value || ""}
      onValueChange={value => onChange(value !== allValue ? value : null)}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={allValue}>{allLabel}</SelectItem>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
