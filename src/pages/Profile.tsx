
import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Profile = () => {
  const { user, isAdmin } = useAuth();

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
                    <p className="text-sm text-gray-500">Роль</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Мои данные</h3>
                <p className="text-gray-500">
                  Здесь будет отображаться информация о ваших решенных вариантах и результатах.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
