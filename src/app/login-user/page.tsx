
'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { HelpCircle, Search, MessageSquare, PackagePlus } from 'lucide-react';
import { collection, query, where, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Donation } from "@/types";

const LoginUserPage = () => {
  const { user, loading } = useAuth();
  const [myDonations, setMyDonations] = useState<Donation[]>([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "donations"), 
        where("donatorId", "==", user.uid),
        limit(3)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const donationsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
        setMyDonations(donationsList);
      });
      return () => unsubscribe();
    }
  }, [user]);

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
        <h2 className="text-2xl font-bold text-blue-800">Access Denied</h2>
        <p className="text-blue-600 mb-6">You must be logged in to view this page.</p>
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
          <h1 className="text-4xl font-bold text-blue-800 mb-4 sm:mb-0">
            Welcome back, {user.displayName || 'User'}
          </h1>
        </div>

        {/* My Donations Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-6">My Donations</h2>
          {myDonations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myDonations.map(donation => (
                 <div key={donation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                   <Image
                     src={donation.imageUrl || "https://placehold.co/600x400.png"}
                     alt={donation.title}
                     data-ai-hint="donation item"
                     width={600}
                     height={400}
                     className="w-full h-48 object-cover"
                   />
                   <div className="p-5">
                     <h3 className="font-bold text-lg text-blue-800 truncate">{donation.title}</h3>
                     <p className="text-blue-600 mt-1 truncate">{donation.description}</p>
                   </div>
                 </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md border border-dashed">
                <PackagePlus size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold text-blue-800">You haven't donated any items yet.</h3>
                <p className="mt-2 text-blue-600">Click the button below to make your first donation!</p>
                <Link href="/donate" className="mt-6 inline-block px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-semibold shadow-sm">
                    Donate an Item
                </Link>
            </div>
          )}
        </div>
        
        {/* Quick Actions Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/how-it-works" className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-500 transition">
              <HelpCircle className="h-6 w-6 text-blue-600 mr-4" />
              <span className="font-semibold text-gray-800">How It Works</span>
            </Link>
            <Link href="/browse" className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-500 transition">
              <Search className="h-6 w-6 text-blue-600 mr-4" />
              <span className="font-semibold text-gray-800">Browse</span>
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
