
'use client';
import React from "react";
import Image from "next/image";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Donation } from "@/types";
import { Tag, HeartHandshake, CalendarDays, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MyDonationsListProps {
    donations: Donation[];
}

const MyDonationsList: React.FC<MyDonationsListProps> = ({ donations }) => {
    const { toast } = useToast();

    const handleDelete = async (donationId: string, donationTitle: string) => {
        if (!confirm(`Are you sure you want to delete the donation "${donationTitle}"?`)) {
            return;
        }

        try {
            await deleteDoc(doc(db, "donations", donationId));
            toast({ title: "Success!", description: `Donation "${donationTitle}" deleted.` });
        } catch (error) {
            console.error("Error deleting donation:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast({ variant: "destructive", title: "Deletion Failed", description: errorMessage });
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {donations.length === 0 ? (
                <p className="text-center text-gray-500 italic">You have not made any donations yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {donations.map(donation => (
                        <div key={donation.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="relative">
                                <Image
                                    src={donation.imageUrl || `https://placehold.co/600x400.png`}
                                    alt={donation.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                    data-ai-hint="donation item"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{donation.title}</h3>
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Tag size={16} className="text-gray-500"/>
                                        <span>{donation.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <HeartHandshake size={16} className="text-gray-500"/>
                                        <span>{donation.condition}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={16} className="text-gray-500"/>
                                        <span>
                                            {donation.createdAt?.seconds
                                                ? new Date(donation.createdAt.seconds * 1000).toLocaleDateString()
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(donation.id, donation.title)}
                                    className="w-full mt-auto bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyDonationsList;
