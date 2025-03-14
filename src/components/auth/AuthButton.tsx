
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, UserCircle } from 'lucide-react';
import { useAuth } from './AuthContext';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthButton: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin, isTeacher, isStudent } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const handleLoginClick = () => {
    setShowLoginDialog(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterDialog(true);
    setShowLoginDialog(false);
  };

  const handleLoginDialogClose = () => {
    setShowLoginDialog(false);
  };

  const handleRegisterDialogClose = () => {
    setShowRegisterDialog(false);
  };

  const getUserRoleName = () => {
    if (isAdmin) return 'Администратор';
    if (isTeacher) return 'Преподаватель';
    if (isStudent) return 'Студент';
    return 'Пользователь';
  };

  if (isAuthenticated && user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
                <span className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary inline-block w-fit">
                  {getUserRoleName()}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center cursor-pointer">
                <UserCircle className="h-4 w-4 mr-2" />
                Личный кабинет
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <>
      <Button variant="outline" onClick={handleLoginClick} className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        <span className="hidden md:inline">Войти</span>
      </Button>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={handleLoginDialogClose}
        showRegister={handleRegisterClick}
      />

      <RegisterDialog
        isOpen={showRegisterDialog}
        onClose={handleRegisterDialogClose}
        showLogin={() => {
          setShowRegisterDialog(false);
          setShowLoginDialog(true);
        }}
      />
    </>
  );
};

export default AuthButton;
