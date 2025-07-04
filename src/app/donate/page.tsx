
'use client';
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DonateForm from "@/components/DonateForm";
import DonationsList from "@/components/DonationsList";
import type { Donation } from "@/types";

const DonatePage = () => {
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
            const donationsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
            setDonations(donationsList);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <DonateForm />
            <DonationsList donations={donations} />
        </div>
    );
};

export default DonatePage;
