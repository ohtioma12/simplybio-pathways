
import { useAuth } from '@/components/auth/AuthContext';

export const usePermissions = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  return {
    // General auth status
    isAuthenticated,
    
    // User role checks
    isAdmin,
    isUser: isAuthenticated && !isAdmin,
    
    // Task-specific permissions
    canViewTasks: isAuthenticated,
    canSolveTasks: isAuthenticated,
    canCreateTasks: isAdmin,
    canEditTasks: isAdmin,
    canDeleteTasks: isAdmin,
    
    // User info
    user
  };
};
