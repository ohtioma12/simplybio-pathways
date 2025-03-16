
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserStatistics from '@/components/task-bank/user-statistics/UserStatistics';
import TelegramVerificationDialog from '@/components/task-bank/TelegramVerificationDialog';
import EmailVerificationDialog from '@/components/auth/EmailVerificationDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ExternalLink, Check, AlertTriangle, Edit, Phone, User, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const { user, isAdmin, updateUserInfo } = useAuth();
  const [showTelegramDialog, setShowTelegramDialog] = useState(false);
  const [isTelegramVerified, setIsTelegramVerified] = useState(false);
  const [lastVerificationTime, setLastVerificationTime] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // User info state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Check if user is verified with Telegram
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      
      const isVerified = localStorage.getItem('telegramSubscribed') === 'true';
      setIsTelegramVerified(isVerified);
      
      const lastChecked = localStorage.getItem('telegramLastChecked');
      if (lastChecked) {
        setLastVerificationTime(parseInt(lastChecked, 10));
      }
      
      // If not admin, check Telegram subscription status periodically
      if (!isAdmin && isVerified) {
        const now = Date.now();
        // Only check once every hour (3600000 ms)
        if (!lastChecked || now - parseInt(lastChecked, 10) > 3600000) {
          // For demo, we'll just use a random chance of "unsubscribing"
          // In production, this would be an actual API call to Telegram
          if (Math.random() < 0.1) { // 10% chance of "unsubscribing" for demo
            setIsTelegramVerified(false);
            localStorage.setItem('telegramSubscribed', 'false');
          }
          localStorage.setItem('telegramLastChecked', now.toString());
          setLastVerificationTime(now);
        }
      }
    }
  }, [user, isAdmin]);
  
  const handleVerifySuccess = () => {
    setIsTelegramVerified(true);
    const now = Date.now();
    localStorage.setItem('telegramLastChecked', now.toString());
    setLastVerificationTime(now);
  };

  const handleSaveChanges = () => {
    if (name.trim() === '') {
      toast.error('Имя не может быть пустым');
      return;
    }
    
    if (user) {
      updateUserInfo(user.id, { name, phone, email });
      setIsEditing(false);
      toast.success('Информация успешно обновлена');
    }
  };
  
  const handleEmailVerify = (verified: boolean) => {
    setShowEmailVerification(false);
    if (verified) {
      handleSaveChanges();
    }
  };

  const isEmailEdited = user && email !== user.email;

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

  // Check if we're on a sub-route of /profile
  if (location.pathname !== '/profile') {
    return null; // Let the sub-route components render
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
              <Card className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Личная информация
                  {!isEditing && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </h3>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Имя</label>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <Input 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Ваше имя" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Телефон</label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <Input 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="Ваш телефон" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Email</label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <Input 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Ваш email" 
                        />
                      </div>
                      {isEmailEdited && (
                        <p className="text-xs text-amber-600 mt-1">
                          Для изменения email потребуется подтверждение по коду
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="default" 
                        onClick={() => {
                          if (isEmailEdited) {
                            setShowEmailVerification(true);
                          } else {
                            handleSaveChanges();
                          }
                        }}
                      >
                        Сохранить
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setName(user.name || '');
                          setPhone(user.phone || '');
                          setEmail(user.email || '');
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Имя</p>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <p className="font-medium">{user.phone || 'Не указан'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID пользователя</p>
                      <p className="font-medium text-xs">{user.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Роль</p>
                      <p className="font-medium capitalize">{user.role}</p>
                    </div>
                  </div>
                )}
                
                {/* Telegram verification status */}
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
              </Card>
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
      
      {/* Email Verification Dialog */}
      <EmailVerificationDialog
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        email={email}
        onVerifySuccess={() => handleEmailVerify(true)}
        onVerifyError={() => handleEmailVerify(false)}
      />
    </div>
  );
};

export default Profile;
