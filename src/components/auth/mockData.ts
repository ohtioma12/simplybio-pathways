
import { UserWithPassword, UserRole } from './types';

export const MOCK_USERS: UserWithPassword[] = [
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
