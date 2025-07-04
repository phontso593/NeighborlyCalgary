
'use client';
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RequestForm from "@/components/RequestForm";
import RequestsList from "@/components/RequestsList";
import type { Request } from "@/types";

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
      <RequestsList requests={requested} />
    </div>
  );
};

export default RequestPage;
