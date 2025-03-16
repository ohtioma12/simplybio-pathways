import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'user' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isTelegramVerified: boolean;
  deleteUser: (userId: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  updateUserInfo: (userId: string, data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: UserWithPassword[] = [
  {
    id: '1',
    email: 'admin@prosto.ru',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    phone: '+7 999 123 45 67'
  },
  {
    id: '2',
    email: 'user@prosto.ru',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as UserRole,
    phone: '+7 999 765 43 21'
  },
  {
    id: '3',
    email: 'odibuda@mail.ru',
    password: 'Odissey13',
    name: 'Odissey',
    role: 'admin' as UserRole,
    phone: '+7 999 111 22 33'
  },
  {
    id: '4',
    email: 'teacher@prosto.ru',
    password: 'teacher123',
    name: 'Teacher User',
    role: 'teacher' as UserRole,
  },
  {
    id: '5',
    email: 'student@prosto.ru',
    password: 'student123',
    name: 'Student User',
    role: 'student' as UserRole,
  },
  {
    id: '6',
    email: 'odisseyscoot@icloud.com',
    password: 'Odissey2004',
    name: 'Odissey Scoot',
    role: 'user' as UserRole,
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserWithPassword[]>(MOCK_USERS);

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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const matchedUser = users.find(
        u => u.email === email && u.password === password
      );
      
      if (matchedUser) {
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        localStorage.setItem('prostoUser', JSON.stringify(userWithoutPassword));
        toast.success(`Добро пожаловать, ${userWithoutPassword.name}!`);
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
      if (users.some(u => u.email === email)) {
        toast.error('Пользователь с таким email уже существует');
        setIsLoading(false);
        return;
      }
      
      const newUser: UserWithPassword = {
        id: (users.length + 1).toString(),
        email,
        password,
        name,
        role
      };
      
      setUsers([...users, newUser]);
      toast.success('Регистрация успешна! Теперь вы можете войти после подтверждения email.');
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          return { ...u, ...data };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      if (user && user.id === userId) {
        const updatedUser = { ...user, ...data };
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      
      if (user && user.id === userId) {
        logout();
      }
      
      toast.success('Пользователь успешно удален');
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userExists = users.some(user => user.email === email);
      
      if (userExists) {
        toast.success('Инструкции по сбросу пароля отправлены на ваш email');
      } else {
        toast.success('Если учетная запись с этим email существует, инструкции по сбросу пароля будут отправлены');
      }
      
    } catch (error) {
      toast.error('Ошибка при отправке инструкций по сбросу пароля');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    return code === '123456';
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
