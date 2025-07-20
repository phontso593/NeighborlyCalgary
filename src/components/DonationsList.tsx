
'use client';
import {useState} from "react";
import Image from "next/image";
import type { Item as Donation } from "@/types";
import { Tag, HeartHandshake, CalendarDays, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DonationsListProps {
    donations: Donation[];
}

const DonationsList: React.FC<DonationsListProps> = ({ donations }) => {
    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    const handleMessageDonator = async (donation: Donation) => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (user.uid === donation.ownerId) {
            alert("You cannot message yourself.");
            return;
        }

        const chatId = [user.uid, donation.ownerId].sort().join('_') + `_${donation.id}`;
        const chatDocRef = doc(db, 'chats', chatId);

        try {
            // Check if chat already exists
            const chatQuery = query(collection(db, "chats"), where("participants", "==", [user.uid, donation.ownerId].sort()), where("itemId", "==", donation.id));
            const querySnapshot = await getDocs(chatQuery);
            
            if (!querySnapshot.empty) {
                // Chat exists, navigate to it
                const existingChat = querySnapshot.docs[0];
                router.push(`/messages/${existingChat.id}`);
            } else {
                // Chat does not exist, create it
                await setDoc(chatDocRef, {
                    participants: [user.uid, donation.ownerId].sort(),
                    participantNames: {
                        [user.uid]: user.displayName || 'Anonymous',
                        [donation.ownerId]: donation.ownerName || 'Anonymous',
                    },
                    itemId: donation.id,
                    itemName: donation.title,
                    createdAt: Timestamp.now(),
                    lastMessage: null,
                });
                router.push(`/messages/${chatId}`);
            }
        } catch (error) {
            console.error("Error creating or finding chat:", error);
            alert("Could not start a conversation. Please try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {donations.length === 0 ? (
                <p className="text-center text-gray-500 italic">No donations found. Try adjusting your search or filters.</p>
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
                                    className="w-full h-48 object-contain bg-gray-100"
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
                                <p className="text-sm text-gray-700 flex-grow mb-4 h-16 overflow-hidden">
                                    {donation.description}
                                </p>
                                <div className="mt-auto flex flex-col gap-2">
                                    <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                        onClick={() => setSelectedDonation(donation)}
                                    >
                                        View Details
                                    </button>
                                     <button onClick={() => handleMessageDonator(donation)} className="w-full flex items-center justify-center bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                                        <MessageSquare size={16} className="mr-2"/>
                                        Message {donation.ownerName || 'User'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Popup Modal */}
            {selectedDonation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelectedDonation(null)}
                        >
                            <span className="text-2xl font-bold">&times;</span>
                        </button>
                        <h2 className="text-2xl font-bold mb-2">{selectedDonation.title}</h2>
                        <Image
                            src={selectedDonation.imageUrl || `https://placehold.co/600x400.png`}
                            alt={selectedDonation.title}
                            width={600}
                            height={400}
                            className="w-full h-48 object-contain bg-gray-100 mb-4 rounded"
                        />
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Category:</strong> {selectedDonation.category}</p>
                            <p><strong>Condition:</strong> {selectedDonation.condition}</p>
                            <p><strong>Donated By:</strong> {selectedDonation.ownerName || 'Anonymous'}</p>
                            <p><strong>Date:</strong> {selectedDonation.createdAt?.seconds
                                ? new Date(selectedDonation.createdAt.seconds * 1000).toLocaleDateString()
                                : "N/A"}
                            </p>
                            <p className="pt-2 border-t"><strong>Description:</strong> {selectedDonation.description}</p>
                        </div>
                         <button
                            onClick={() => handleMessageDonator(selectedDonation)}
                            className="w-full mt-4 flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                        >
                            <MessageSquare size={16} className="mr-2"/>
                            Message {selectedDonation.ownerName || 'User'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DonationsList;
