
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'user' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from a database
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@prosto.ru',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    email: 'user@prosto.ru',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as UserRole,
  },
  {
    id: '3',
    email: 'odibuda@mail.ru',
    password: 'Odissey13',
    name: 'Odissey',
    role: 'admin' as UserRole,
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
  // User account with regular user role
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
  const [users, setUsers] = useState(MOCK_USERS);

  useEffect(() => {
    // Check if user is stored in localStorage (persistence)
    const storedUser = localStorage.getItem('prostoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
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
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        toast.error('Пользователь с таким email уже существует');
        setIsLoading(false);
        return;
      }
      
      // In a real app, this would create a user in the database
      // For this demo, we'll simulate adding a user to our in-memory array
      const newUser = {
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

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter out the user with the specified ID
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      
      // If the deleted user is the current user, log them out
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userExists = users.some(user => user.email === email);
      
      if (userExists) {
        // In a real app, send password reset email
        toast.success('Инструкции по сбросу пароля отправлены на ваш email');
      } else {
        // We're being deliberately vague here for security reasons
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
    // In a real app, verify the code with an API
    // For demo purposes, we'll just return true
    return true;
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
