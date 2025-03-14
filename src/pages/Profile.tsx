
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardDescription, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Shield, 
  Link, 
  Check,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, logout } = useAuth();
  const [telegramUsername, setTelegramUsername] = useState(
    localStorage.getItem('telegramUsername') || ''
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(
    localStorage.getItem('telegramSubscribed') === 'true'
  );

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Профиль пользователя</CardTitle>
            <CardDescription>
              Необходимо войти в систему для просмотра профиля
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Для доступа к личному профилю необходимо авторизоваться.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleTelegramVerify = () => {
    if (!telegramUsername) {
      toast.error('Введите имя пользователя Telegram');
      return;
    }

    setIsVerifying(true);
    
    // Simulating verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsSubscribed(true);
      localStorage.setItem('telegramUsername', telegramUsername);
      localStorage.setItem('telegramSubscribed', 'true');
      toast.success('Подписка на канал подтверждена!');
    }, 1500);
  };

  const getRoleBadgeClass = () => {
    if (user.role === 'teacher') {
      return 'bg-blue-100 text-blue-800';
    } else if (user.role === 'admin') {
      return 'bg-purple-100 text-purple-800';
    } else if (user.role === 'student') {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const formatRoleName = (role: string) => {
    switch (role) {
      case 'teacher': return 'Преподаватель';
      case 'admin': return 'Администратор';
      case 'student': return 'Студент';
      default: return 'Пользователь';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Личный кабинет</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* User Info Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Информация пользователя</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Имя</Label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">ID пользователя</Label>
                <p className="font-medium">{user.id}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Статус</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getRoleBadgeClass()}`}>
                    {formatRoleName(user.role)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Telegram Verification Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link className="h-5 w-5 text-primary" />
              <CardTitle>Telegram</CardTitle>
            </div>
            <CardDescription>
              Подписка на канал Telegram для доступа к заданиям
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="telegram-username">Имя пользователя Telegram</Label>
              <div className="flex gap-2 mt-1.5">
                <Input 
                  id="telegram-username"
                  placeholder="@username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                />
              </div>
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
              
              <Button 
                onClick={handleTelegramVerify}
                disabled={isVerifying || !telegramUsername || isSubscribed}
                className="w-full"
                size="sm"
              >
                {isVerifying ? 'Проверка...' : isSubscribed ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Подписка подтверждена
                  </span>
                ) : 'Проверить подписку'}
              </Button>
            </div>

            {isSubscribed && (
              <div className="bg-green-50 text-green-800 rounded-md p-2 text-sm flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-green-600" />
                <p>Вы подписаны на канал и имеете доступ ко всем заданиям</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          className="text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};

export default Profile;
