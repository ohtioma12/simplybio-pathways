
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, ExternalLink, Link } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface TelegramVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TelegramVerificationDialog: React.FC<TelegramVerificationDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [telegramUsername, setTelegramUsername] = useState(
    localStorage.getItem('telegramUsername') || ''
  );
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (!telegramUsername) {
      toast.error('Введите имя пользователя Telegram');
      return;
    }

    setIsVerifying(true);
    
    // Simulating verification process
    setTimeout(() => {
      setIsVerifying(false);
      localStorage.setItem('telegramUsername', telegramUsername);
      localStorage.setItem('telegramSubscribed', 'true');
      toast.success('Подписка на канал подтверждена!');
      onClose();
    }, 1500);
  };

  const goToProfile = () => {
    navigate('/profile');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Подпишитесь на Telegram канал</DialogTitle>
          <DialogDescription>
            Для доступа к заданиям необходимо подписаться на наш Telegram канал
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
            <p className="flex items-start gap-2">
              <Link className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Наш Telegram канал содержит полезные материалы, обновления и подсказки по подготовке к экзаменам
              </span>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram-username">Имя пользователя Telegram</Label>
            <Input 
              id="telegram-username"
              placeholder="@username"
              value={telegramUsername}
              onChange={(e) => setTelegramUsername(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline"
              size="sm"
              className="flex gap-2 items-center justify-center"
              asChild
            >
              <a href="https://t.me/pro100_bio" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Перейти на канал
              </a>
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={goToProfile}>
            Позже
          </Button>
          <Button onClick={handleVerify} disabled={isVerifying || !telegramUsername}>
            {isVerifying ? 'Проверка...' : 'Проверить подписку'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramVerificationDialog;
