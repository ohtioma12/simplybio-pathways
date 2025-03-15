
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserStatistics from '@/components/task-bank/user-statistics/UserStatistics';
import TelegramVerificationDialog from '@/components/task-bank/TelegramVerificationDialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Profile = () => {
  const { user, isAdmin } = useAuth();
  const [showTelegramDialog, setShowTelegramDialog] = useState(false);
  const [isTelegramVerified, setIsTelegramVerified] = useState(false);
  
  // Check if user is verified with Telegram
  useEffect(() => {
    if (user) {
      const isVerified = localStorage.getItem('telegramSubscribed') === 'true';
      setIsTelegramVerified(isVerified);
    }
  }, [user]);
  
  const handleVerifySuccess = () => {
    setIsTelegramVerified(true);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Необходимо войти в систему</h2>
          <p>Для доступа к профилю необходимо авторизоваться.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Профиль пользователя</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Личная информация</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Имя</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID пользователя</p>
                    <p className="font-medium text-xs">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Роль</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                  
                  {/* Telegram verification status */}
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Статус подписки на Telegram</p>
                    
                    {isTelegramVerified ? (
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">
                          Вы подписаны на канал Pro100 Bio
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <>
                        <Alert className="bg-amber-50 border-amber-200 mb-3">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-600">
                            Для доступа к заданиям необходимо подписаться на Telegram канал
                          </AlertDescription>
                        </Alert>
                        
                        <Button 
                          onClick={() => setShowTelegramDialog(true)}
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
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Моя статистика</h3>
                <UserStatistics userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Telegram Verification Dialog */}
      <TelegramVerificationDialog 
        isOpen={showTelegramDialog} 
        onClose={() => setShowTelegramDialog(false)}
        onVerifySuccess={handleVerifySuccess}
      />
    </div>
  );
};

export default Profile;
