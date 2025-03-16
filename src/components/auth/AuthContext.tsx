
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, UserRole, AuthContextType } from './types';
import { authService } from './authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('prostoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const loggedInUser = await authService.login(email, password);
      
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem('prostoUser', JSON.stringify(loggedInUser));
        toast.success(`Добро пожаловать, ${loggedInUser.name}!`);
      } else {
        toast.error('Неверный email или пароль');
      }
    } catch (error) {
      toast.error('Ошибка входа в систему');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole = 'student') => {
    setIsLoading(true);
    
    try {
      const success = await authService.register(email, password, name, role);
      
      if (success) {
        toast.success('Регистрация успешна! Теперь вы можете войти после подтверждения email.');
      } else {
        toast.error('Пользователь с таким email уже существует');
      }
    } catch (error) {
      toast.error('Ошибка при регистрации');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prostoUser');
    toast.info('Вы вышли из системы');
  };

  const updateUserInfo = async (userId: string, data: Partial<User>) => {
    setIsLoading(true);
    
    try {
      const updatedUser = await authService.updateUserInfo(userId, data);
      
      if (updatedUser && user && user.id === userId) {
        setUser(updatedUser);
        localStorage.setItem('prostoUser', JSON.stringify(updatedUser));
      }
      
      toast.success('Информация пользователя обновлена');
    } catch (error) {
      toast.error('Ошибка при обновлении информации пользователя');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    
    try {
      const success = await authService.deleteUser(userId);
      
      if (success) {
        if (user && user.id === userId) {
          logout();
        }
        
        toast.success('Пользователь успешно удален');
      } else {
        toast.error('Пользователь не найден');
      }
    } catch (error) {
      toast.error('Ошибка при удалении пользователя');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      await authService.resetPassword(email);
      toast.success('Инструкции по сбросу пароля отправлены на ваш email');
    } catch (error) {
      toast.error('Ошибка при отправке инструкций по сбросу пароля');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    return authService.verifyEmail(email, code);
  };

  const isTelegramVerified = localStorage.getItem('telegramSubscribed') === 'true';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        isAdmin: user?.role === 'admin',
        isTeacher: user?.role === 'teacher',
        isStudent: user?.role === 'student',
        isTelegramVerified,
        deleteUser,
        resetPassword,
        verifyEmail,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
