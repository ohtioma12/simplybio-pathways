
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Пожалуйста, введите email');
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, call API to send reset link
      // For demo, simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsResetSent(true);
      toast.success('Инструкции по сбросу пароля отправлены на ваш email');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Ошибка при отправке инструкций. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsResetSent(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Восстановление пароля</DialogTitle>
          <DialogDescription>
            Введите email для получения инструкций по сбросу пароля
          </DialogDescription>
        </DialogHeader>
        
        {!isResetSent ? (
          <form onSubmit={handleResetPassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="example@prosto.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <DialogFooter className="pt-4">
              <div className="w-full flex flex-col space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleClose}
                >
                  Отмена
                </Button>
              </div>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">
              Мы отправили инструкции по сбросу пароля на адрес <span className="font-medium">{email}</span>. 
              Пожалуйста, проверьте вашу почту и следуйте указанным инструкциям.
            </p>
            <Button onClick={handleClose} className="mt-4">
              Закрыть
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
