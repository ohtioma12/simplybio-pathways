
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'user' | 'admin';

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
  register: (email: string, password: string, name: string) => Promise<void>;
  isAdmin: boolean;
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
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      
      const matchedUser = MOCK_USERS.find(
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

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast.error('Пользователь с таким email уже существует');
        setIsLoading(false);
        return;
      }
      
      // In a real app, this would create a user in the database
      // For this demo, we'll just simulate success
      toast.success('Регистрация успешна! Теперь вы можете войти.');
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
