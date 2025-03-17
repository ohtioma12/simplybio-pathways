
import React from 'react';
import { ExternalLink, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface TelegramVerificationCardProps {
  isTelegramVerified: boolean;
  lastVerificationTime: number | null;
  onRequestVerification: () => void;
}

const TelegramVerificationCard: React.FC<TelegramVerificationCardProps> = ({
  isTelegramVerified,
  lastVerificationTime,
  onRequestVerification
}) => {
  return (
    <div className="mt-6 pt-4 border-t">
      <p className="text-sm font-medium mb-2">Статус подписки на Telegram</p>
      
      {isTelegramVerified ? (
        <>
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Вы подписаны на канал Pro100 Bio
            </AlertDescription>
          </Alert>
          {lastVerificationTime && (
            <p className="text-xs text-muted-foreground mt-2">
              Последняя проверка: {new Date(lastVerificationTime).toLocaleString()}
            </p>
          )}
        </>
      ) : (
        <>
          <Alert className="bg-amber-50 border-amber-200 mb-3">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-600">
              Для доступа к заданиям необходимо подписаться на Telegram канал
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={onRequestVerification}
            className="w-full"
          >
            Подписаться на канал
          </Button>
        </>
      )}
      
      <div className="mt-3">
        <a 
          href="https://t.me/pro100_bio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          Открыть канал в Telegram
        </a>
      </div>
    </div>
  );
};

export default TelegramVerificationCard;
