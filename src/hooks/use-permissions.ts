
import { useAuth } from '@/components/auth/AuthContext';

export const usePermissions = () => {
  const { user, isAuthenticated, isAdmin, isTeacher, isStudent, isTelegramVerified } = useAuth();

  return {
    // General auth status
    isAuthenticated,
    
    // User role checks
    isAdmin,
    isTeacher,
    isStudent,
    isUser: isAuthenticated && !isAdmin && !isTeacher && !isStudent,
    
    // Telegram verification
    isTelegramVerified,
    
    // Task-specific permissions
    canViewTasks: isAuthenticated,
    canSolveTasks: isAuthenticated && isTelegramVerified,
    canCreateTasks: isAdmin || isTeacher,
    canEditTasks: isAdmin || isTeacher,
    canDeleteTasks: isAdmin,
    
    // Test management permissions
    canCreateTests: isAuthenticated && isTelegramVerified,
    canViewAllTests: isAdmin || isTeacher,
    canEditResources: isAdmin,
    
    // User info
    user
  };
};
