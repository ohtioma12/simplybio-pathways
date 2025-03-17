
import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useLocation } from 'react-router-dom';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  
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
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;
