
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileContent from '@/components/profile/ProfileContent';
import TelegramVerificationDialog from '@/components/task-bank/TelegramVerificationDialog';
import EmailVerificationDialog from '@/components/auth/EmailVerificationDialog';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const [showTelegramDialog, setShowTelegramDialog] = useState(false);
  const [isTelegramVerified, setIsTelegramVerified] = useState(false);
  const [lastVerificationTime, setLastVerificationTime] = useState<number | null>(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  
  // Check if user is verified with Telegram
  useEffect(() => {
    if (user) {
      const isVerified = localStorage.getItem('telegramSubscribed') === 'true';
      setIsTelegramVerified(isVerified);
      
      const lastChecked = localStorage.getItem('telegramLastChecked');
      if (lastChecked) {
        setLastVerificationTime(parseInt(lastChecked, 10));
      }
      
      // If not admin, check Telegram subscription status periodically
      if (!user.role.includes('admin') && isVerified) {
        const now = Date.now();
        // Only check once every hour (3600000 ms)
        if (!lastChecked || now - parseInt(lastChecked, 10) > 3600000) {
          // For demo, we'll just use a random chance of "unsubscribing"
          // In production, this would be an actual API call to Telegram
          if (Math.random() < 0.1) { // 10% chance of "unsubscribing" for demo
            setIsTelegramVerified(false);
            localStorage.setItem('telegramSubscribed', 'false');
          }
          localStorage.setItem('telegramLastChecked', now.toString());
          setLastVerificationTime(now);
        }
      }
    }
  }, [user]);
  
  const handleVerifySuccess = () => {
    setIsTelegramVerified(true);
    const now = Date.now();
    localStorage.setItem('telegramLastChecked', now.toString());
    setLastVerificationTime(now);
  };

  const handleRequestEmailVerification = (email: string) => {
    setPendingEmail(email);
    setShowEmailVerification(true);
  };
  
  const handleEmailVerify = (verified: boolean) => {
    setShowEmailVerification(false);
    
    if (verified && user) {
      // Update user info with the new email
      // (This functionality is handled by the EmailVerificationDialog component)
      toast.success('Email успешно изменен');
    } else if (!verified) {
      toast.error('Ошибка подтверждения email');
    }
  };

  if (!user) {
    return <ProfileLayout>{null}</ProfileLayout>;
  }

  return (
    <ProfileLayout>
      <ProfileContent 
        userId={user.id}
        isTelegramVerified={isTelegramVerified}
        lastVerificationTime={lastVerificationTime}
        onRequestTelegramVerification={() => setShowTelegramDialog(true)}
        onRequestEmailVerification={handleRequestEmailVerification}
      />
      
      {/* Telegram Verification Dialog */}
      <TelegramVerificationDialog 
        isOpen={showTelegramDialog} 
        onClose={() => setShowTelegramDialog(false)}
        onVerifySuccess={handleVerifySuccess}
      />
      
      {/* Email Verification Dialog */}
      <EmailVerificationDialog
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        email={pendingEmail}
        onVerifySuccess={() => handleEmailVerify(true)}
        onVerifyError={() => handleEmailVerify(false)}
      />
    </ProfileLayout>
  );
};

export default Profile;
