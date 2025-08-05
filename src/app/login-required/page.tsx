
'use client';
import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

const LoginRequiredPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50">
      <div className="max-w-md mx-auto my-10 p-8 text-center bg-white rounded-lg shadow-md border border-yellow-300">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="mt-6 text-2xl font-bold mb-4 text-gray-800">Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in to donate an item. Please log in or create an account to continue.
        </p>
        <Link 
            href="/login" 
            className="w-full inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-semibold shadow-sm transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default LoginRequiredPage;
