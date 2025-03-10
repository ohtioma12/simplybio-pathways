
import { useAuth } from '@/components/auth/AuthContext';

export const usePermissions = () => {
  const { user, isAuthenticated, isAdmin, isTeacher, isStudent } = useAuth();

  return {
    // General auth status
    isAuthenticated,
    
    // User role checks
    isAdmin,
    isTeacher,
    isStudent,
    isUser: isAuthenticated && !isAdmin && !isTeacher && !isStudent,
    
    // Task-specific permissions
    canViewTasks: isAuthenticated,
    canSolveTasks: isAuthenticated,
    canCreateTasks: isAdmin || isTeacher,
    canEditTasks: isAdmin || isTeacher,
    canDeleteTasks: isAdmin,
    
    // Test management permissions
    canCreateTests: isAuthenticated,
    canViewAllTests: isAdmin || isTeacher,
    canEditResources: isAdmin,
    
    // User info
    user
  };
};
