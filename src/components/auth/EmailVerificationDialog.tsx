
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { MailCheck } from 'lucide-react';

interface EmailVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerifySuccess: () => void;
  onVerifyError?: () => void;
}

const EmailVerificationDialog: React.FC<EmailVerificationDialogProps> = ({ 
  isOpen, 
  onClose,
  email,
  onVerifySuccess,
  onVerifyError
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  
  // Generate a random verification code for demo purposes
  const [correctCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  
  useEffect(() => {
    if (isOpen) {
      // For demo purposes, display the code in a toast
      toast.info(`Код подтверждения: ${correctCode}`, {
        duration: 10000,
      });
      
      // Reset resend timer
      setSecondsLeft(60);
    }
  }, [isOpen, correctCode]);
  
  // Countdown timer for resend button
  useEffect(() => {
    if (secondsLeft <= 0) return;
    
    const timerId = setTimeout(() => {
      setSecondsLeft(seconds => seconds - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [secondsLeft]);
  
  const handleVerify = async () => {
    if (!verificationCode) {
      toast.error('Пожалуйста, введите код подтверждения');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would validate this with an API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (verificationCode === correctCode) {
        toast.success('Email успешно подтверждён');
        onVerifySuccess();
        onClose();
      } else {
        toast.error('Неверный код подтверждения');
        if (onVerifyError) {
          onVerifyError();
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Ошибка при проверке кода');
      if (onVerifyError) {
        onVerifyError();
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    // In a real app, send this code via API
    toast.info(`Новый код подтверждения: ${newCode}`, {
      duration: 10000,
    });
    
    setSecondsLeft(60);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Подтверждение email</DialogTitle>
          <DialogDescription>
            Мы отправили код подтверждения на {email}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <MailCheck className="h-6 w-6 text-blue-600" />
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            Пожалуйста, введите 6-значный код, который мы отправили на ваш email для подтверждения аккаунта.
          </p>
          
          <div className="space-y-2">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-widest"
            />
          </div>
          
          <Button 
            onClick={handleVerify} 
            className="w-full" 
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? 'Проверка...' : 'Подтвердить'}
          </Button>
          
          <div className="text-center">
            <Button 
              variant="link" 
              onClick={handleResendCode}
              disabled={secondsLeft > 0}
              className="text-sm"
            >
              {secondsLeft > 0 ? `Отправить код повторно (${secondsLeft}с)` : 'Отправить код повторно'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationDialog;
