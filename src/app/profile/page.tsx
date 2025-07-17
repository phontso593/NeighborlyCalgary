
'use client';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Edit, Box, Heart, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const auth = getAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const ActionButton = ({ icon, text, onClick, className = '' }: { icon: React.ReactNode, text: string, onClick: () => void, className?: string }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-4 border rounded-lg hover:bg-gray-100 transition-colors w-full ${className}`}
    >
      {icon}
      <span className="ml-2 font-medium">{text}</span>
    </button>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
        <p className="text-gray-600 mb-6">You must be logged in to view your profile.</p>
        <Link href="/login" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Go to Login
        </Link>
      </div>
    );
  }

  const getJoinDate = () => {
    if (user?.metadata.creationTime) {
      return new Date(user.metadata.creationTime).toISOString().split('T')[0];
    }
    return 'N/A';
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">My Profile</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your account details and activity.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center border-b pb-6 mb-6">
            <div className="bg-gray-200 p-3 rounded-full mr-6">
              <UserIcon size={32} className="text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.displayName || 'Anonymous User'}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">Joined: {getJoinDate()}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-blue-600 mb-4">Account Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActionButton icon={<Edit size={20} />} text="Edit Profile" onClick={() => setActiveSection('edit')} />
            <ActionButton icon={<Box size={20} />} text="My Donations" onClick={() => router.push('/donations')} />
            <ActionButton icon={<Heart size={20} />} text="My Requests" onClick={() => router.push('/requested')} />
            <ActionButton
              icon={<LogOut size={20} />}
              text="Log Out"
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600"
            />
          </div>

          <div className="mt-8 pt-6 border-t">
            {activeSection === 'edit' && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Edit Profile</h4>
                <p className="text-gray-600">Profile editing is not yet available.</p>
              </div>
            )}
            {!activeSection && <p className="text-center text-gray-500 italic">Select an action above to manage your account.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
