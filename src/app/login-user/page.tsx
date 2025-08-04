'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { List, Mail, MessageSquare } from 'lucide-react';

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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
            Welcome back, {user.displayName || 'User'}
          </h1>
          <div className="flex space-x-3">
            <Link href="/donate" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-semibold shadow-sm">
              Donate
            </Link>
            <Link href="/request" className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">
              Request
            </Link>
          </div>
        </div>

        {/* Popular Donations Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Donations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Clothing Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Clothing donation"
                data-ai-hint="clothing donation"
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900">Clothing</h3>
                <p className="text-gray-600 mt-1">Donate your gently used clothing</p>
              </div>
            </div>
            {/* Furniture Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Furniture donation"
                data-ai-hint="sofa living room"
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900">Furniture</h3>
                <p className="text-gray-600 mt-1">Donate furniture in good condition</p>
              </div>
            </div>
            {/* Electronics Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Electronics donation"
                data-ai-hint="circuit board electronics"
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900">Electronics</h3>
                <p className="text-gray-600 mt-1">Donate electronics that are still functional</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/donations" className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-500 transition">
              <List className="h-6 w-6 text-blue-600 mr-4" />
              <span className="font-semibold text-gray-800">List Donations</span>
            </Link>
            <Link href="/contact" className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-500 transition">
              <Mail className="h-6 w-6 text-blue-600 mr-4" />
              <span className="font-semibold text-gray-800">Contact Us</span>
            </Link>
            <Link href="/messages" className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-500 transition">
              <MessageSquare className="h-6 w-6 text-blue-600 mr-4" />
              <span className="font-semibold text-gray-800">Messages</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginUserPage;
