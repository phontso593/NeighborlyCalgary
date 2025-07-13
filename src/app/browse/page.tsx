
'use client';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Donation } from "@/types";
import SearchAndFilter from '@/components/Search&Filter';
import DonationsList from '@/components/DonationsList';

const BrowsePage = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
        const donationsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
        setDonations(donationsList);
        setFilteredDonations(donationsList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <SearchAndFilter allDonations={donations} onFilterChange={setFilteredDonations} />
      <DonationsList donations={filteredDonations} />
    </div>
  );
};

export default BrowsePage;
