
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsultationButton from '@/components/ui/ConsultationButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/task-bank', label: 'Банк заданий' },
    { href: '/resources', label: 'Вебинары и материалы' },
    { href: '/reviews', label: 'Отзывы' },
    { href: '/contact', label: 'Обратная связь' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-subtle' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <img 
              src="/lovable-uploads/937cc860-4189-4b9a-99ab-8c789a694da7.png" 
              alt="ПроСТО" 
              className="h-10 md:h-12"
              width={140}
              height={48}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-3 py-2 text-base transition-colors rounded-md focus-ring',
                  location.pathname === link.href
                    ? 'text-prosto-blue font-medium'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/10'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4">
              <ConsultationButton />
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-subtle animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-3 py-3 text-lg rounded-md focus-ring',
                  location.pathname === link.href
                    ? 'text-prosto-blue font-medium bg-prosto-blue-light/30'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/10'
                )}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ConsultationButton className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
