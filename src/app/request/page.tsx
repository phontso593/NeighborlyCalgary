
'use client';
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/assets/firebaseConfig";
import RequestForm from "@/components/RequestForm";

interface Request {
  id: string;
  item: string;
  quantity: number;
  description: string;
  category: string;
  createdAt?: { seconds: number };
}

const RequestPage = () => {
  const [requested, setRequested] = useState<Request[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "requested"), (snapshot) => {
      const requestedList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request));
      setRequested(requestedList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <RequestForm />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Recent Requests</h3>
        {requested.length === 0 ? (
          <p className="text-center text-gray-500 italic">No requests available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {requested.map(request => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col">
                <h4 className="text-lg font-bold text-blue-600 mb-2">{request.item}</h4>
                <p className="text-green-600 font-semibold mb-2">{request.quantity} requested</p>
                {request.description && <p className="text-gray-700 text-sm mb-3">{request.description}</p>}
                <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-500">
                  <p><span className="font-semibold">Category:</span> {request.category}</p>
                  <p>
                    <span className="font-semibold">Requested on:</span>{" "}
                    {request.createdAt?.seconds
                      ? new Date(request.createdAt.seconds * 1000).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
