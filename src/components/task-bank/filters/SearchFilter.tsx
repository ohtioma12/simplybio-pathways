
import React from 'react';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  value,
  onChange,
  placeholder = "Поиск..."
}) => {
  return (
    <input 
      type="text"
      id="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchFilter;
