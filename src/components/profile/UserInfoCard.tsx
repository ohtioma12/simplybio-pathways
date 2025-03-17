
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { User, Edit, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface UserInfoCardProps {
  onRequestEmailVerification: (email: string) => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ onRequestEmailVerification }) => {
  const { user, updateUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // User info state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  
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

  const isEmailEdited = user && email !== user.email;

  return (
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
                  onRequestEmailVerification(email);
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
                setName(user?.name || '');
                setPhone(user?.phone || '');
                setEmail(user?.email || '');
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
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Телефон</p>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <p className="font-medium">{user?.phone || 'Не указан'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">ID пользователя</p>
            <p className="font-medium text-xs">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Роль</p>
            <p className="font-medium capitalize">{user?.role}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserInfoCard;
