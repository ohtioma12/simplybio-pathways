
import React from 'react';
import UserInfoCard from './UserInfoCard';
import TelegramVerificationCard from './TelegramVerificationCard';
import UserStatistics from '@/components/task-bank/user-statistics/UserStatistics';

interface ProfileContentProps {
  userId: string;
  isTelegramVerified: boolean;
  lastVerificationTime: number | null;
  onRequestTelegramVerification: () => void;
  onRequestEmailVerification: (email: string) => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  userId,
  isTelegramVerified,
  lastVerificationTime,
  onRequestTelegramVerification,
  onRequestEmailVerification
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <UserInfoCard onRequestEmailVerification={onRequestEmailVerification} />
        
        <div className="mt-6">
          <TelegramVerificationCard 
            isTelegramVerified={isTelegramVerified}
            lastVerificationTime={lastVerificationTime}
            onRequestVerification={onRequestTelegramVerification}
          />
        </div>
      </div>
      
      <div className="md:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Моя статистика</h3>
          <UserStatistics userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
