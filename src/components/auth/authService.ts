
import { User, UserWithPassword, UserRole } from './types';
import { toast } from 'sonner';
import { MOCK_USERS } from './mockData';

export class AuthService {
  private users: UserWithPassword[];

  constructor(initialUsers: UserWithPassword[] = MOCK_USERS) {
    this.users = [...initialUsers];
  }

  async login(email: string, password: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const matchedUser = this.users.find(
      u => u.email === email && u.password === password
    );
    
    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      return userWithoutPassword;
    }
    
    return null;
  }

  async register(email: string, password: string, name: string, role: UserRole = 'student'): Promise<boolean> {
    if (this.users.some(u => u.email === email)) {
      return false;
    }
    
    const newUser: UserWithPassword = {
      id: (this.users.length + 1).toString(),
      email,
      password,
      name,
      role
    };
    
    this.users.push(newUser);
    return true;
  }

  async updateUserInfo(userId: string, data: Partial<User>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...data };
    
    const { password, ...userWithoutPassword } = this.users[userIndex];
    return userWithoutPassword;
  }

  async deleteUser(userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== userId);
    
    return this.users.length !== initialLength;
  }

  async resetPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would send an email to reset the password
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    return code === '123456';
  }

  getUsers(): UserWithPassword[] {
    return this.users;
  }

  setUsers(users: UserWithPassword[]): void {
    this.users = users;
  }
}

// Export a singleton instance by default
export const authService = new AuthService();
