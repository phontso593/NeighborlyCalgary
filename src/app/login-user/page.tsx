'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

const LoginUserPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
        <p className="text-gray-600 mb-6">You must be logged in to view this page.</p>
        <Link href="/login" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome, {user.displayName || 'User'}!</h2>
      <p className="text-gray-600 mb-8">This is your dashboard. From here you can manage your donations and requests.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/donate" className="block p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
          <h3 className="text-xl font-bold text-blue-800">Make a Donation</h3>
          <p className="text-blue-700 mt-2">Have items to share? List them for your neighbors.</p>
        </Link>
        <Link href="/request" className="block p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
          <h3 className="text-xl font-bold text-green-800">Request an Item</h3>
          <p className="text-green-700 mt-2">Need something? See if someone in the community can help.</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginUserPage;
