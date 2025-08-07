
'use client';
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, startAfter, limit, getDocs, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Donation } from "@/types";
import SearchAndFilter from '@/components/SearchAndFilter';
import DonationsList from '@/components/DonationsList';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const PAGE_SIZE = 8;

const BrowsePage = () => {
  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchDonations = async (initial = false) => {
    if (initial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let q;
      if (initial) {
        q = query(
          collection(db, "donations"),
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );
      } else if (lastVisible) {
        q = query(
          collection(db, "donations"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      } else {
        // No more documents to fetch
        setHasMore(false);
        setLoadingMore(false);
        return;
      }
      
      const documentSnapshots = await getDocs(q);
      
      const newDonations = documentSnapshots.docs.map(doc => {
          const data = doc.data() || {};
          return { id: doc.id, ...data } as Donation;
      });
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      setLastVisible(lastDoc || null);
      setHasMore(newDonations.length === PAGE_SIZE);

      if(initial) {
        setAllDonations(newDonations);
        setFilteredDonations(newDonations);
      } else {
        const updatedDonations = [...allDonations, ...newDonations];
        setAllDonations(updatedDonations);
        setFilteredDonations(updatedDonations);
      }

    } catch (error) {
        console.error("Error fetching donations:", error);
    } finally {
        if (initial) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
    }
  };
  
  useEffect(() => {
    fetchDonations(true);
  }, []);
  

  const handleLoadMore = () => {
    if (!loadingMore) {
        fetchDonations();
    }
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-blue-600">Available Donations</h1>
        <p className="mt-2 text-md text-gray-600">
          Browse items generously donated by our community. Use the filters to find what you need.
        </p>
      </div>
      <SearchAndFilter allDonations={allDonations} onFilterChange={setFilteredDonations} />
      <DonationsList donations={filteredDonations} />
      <div className="text-center mt-10">
        {hasMore && (
            <Button onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : 'Load More'}
            </Button>
        )}
        {!hasMore && allDonations.length > 0 && (
          <p className="text-gray-500">You've reached the end of the list.</p>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
