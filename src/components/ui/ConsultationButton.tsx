
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

interface ConsultationButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ConsultationButton: React.FC<ConsultationButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'default'
}) => {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleClick}
      className={`font-medium hover-lift ${className}`}
    >
      <CalendarDays className="mr-2 h-4 w-4" />
      Записаться на консультацию
    </Button>
  );
};

export default ConsultationButton;
