'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import type { Donation, Request as RequestType } from '@/types';
import Link from 'next/link';

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<RequestType[]>([]);

  useEffect(() => {
    if (user) {
      const donationsQuery = query(collection(db, 'donations'), where('uid', '==', user.uid));
      const unsubscribeDonations = onSnapshot(donationsQuery, (snapshot) => {
        const userDonations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
        setDonations(userDonations);
      });

      const requestsQuery = query(collection(db, 'requested'), where('uid', '==', user.uid));
      const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
        const userRequests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RequestType));
        setRequests(userRequests);
      });

      return () => {
        unsubscribeDonations();
        unsubscribeRequests();
      };
    }
  }, [user]);

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

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h2>
      <div className="mb-8">
        <p className="text-lg"><span className="font-semibold">Name:</span> {user.displayName}</p>
        <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-700">My Donations</h3>
        {donations.length > 0 ? (
          <ul className="space-y-4">
            {donations.map(donation => (
              <li key={donation.id} className="p-4 bg-gray-50 rounded-lg border">
                <p className="font-bold text-blue-700">{donation.item} (x{donation.quantity})</p>
                <p className="text-sm text-gray-600">{donation.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">You haven't made any donations yet.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">My Requests</h3>
        {requests.length > 0 ? (
          <ul className="space-y-4">
            {requests.map(request => (
              <li key={request.id} className="p-4 bg-gray-50 rounded-lg border">
                <p className="font-bold text-green-700">{request.item} (x{request.quantity})</p>
                <p className="text-sm text-gray-600">{request.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">You haven't made any requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
