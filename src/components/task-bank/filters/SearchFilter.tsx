
import React from 'react';
import { Search } from 'lucide-react';

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
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input 
        type="text"
        id="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md pl-9 pr-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </div>
  );
};

export default SearchFilter;
