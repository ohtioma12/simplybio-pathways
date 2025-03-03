
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-prosto-blue-light/30 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/">
              <img 
                src="/lovable-uploads/937cc860-4189-4b9a-99ab-8c789a694da7.png" 
                alt="ПроСТО" 
                className="h-10"
                width={140}
                height={40}
              />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Образовательный проект для подготовки к ЕГЭ по биологии, который помогает школьникам достичь высоких результатов.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-prosto-blue transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/task-bank" className="text-muted-foreground hover:text-prosto-blue transition-colors">
                  Банк заданий
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-prosto-blue transition-colors">
                  Вебинары и материалы
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-prosto-blue transition-colors">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-prosto-blue transition-colors">
                  Обратная связь
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-lg mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: info@prosto-bio.ru
              </li>
              <li className="text-muted-foreground">
                Телефон: +7 (999) 123-45-67
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-medium text-lg mb-4">Социальные сети</h3>
            <div className="flex space-x-4">
              <a 
                href="https://t.me/yourtelegram" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-prosto-blue text-white hover:bg-prosto-blue-dark transition-colors"
                aria-label="Telegram Channel"
              >
                <MessageSquare size={20} />
              </a>
              <a 
                href="https://youtube.com/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-prosto-blue text-white hover:bg-prosto-blue-dark transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} ПроСТО. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
