
'use client';
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RequestForm from "@/components/RequestForm";
import RequestsList from "@/components/RequestsList";
import type { Request } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import Link from 'next/link';

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "requested"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const requestsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request));
        setRequests(requestsList);
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
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
              <p className="text-gray-600 mb-6">You must be logged in to view your requests.</p>
              <Link href="/login" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Go to Login
              </Link>
          </div>
      );
  }

  return (
    <div>
      <RequestForm />
      <RequestsList requests={requests} />
    </div>
  );
};

export default RequestsPage;
