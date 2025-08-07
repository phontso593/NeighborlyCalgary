
'use client';
import {useState, useEffect} from "react";
import Image from "next/image";
import type { Donation } from "@/types";
import { Tag, HeartHandshake, CalendarDays, MessageSquare, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, doc, setDoc, Timestamp, addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ChatApp from "./chat";

interface DonationsListProps {
    donations: Donation[];
}

const DonationsList: React.FC<DonationsListProps> = ({ donations: initialDonations }) => {
    const [donations, setDonations] = useState<Donation[]>(initialDonations);
    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
    const [chatDonation, setChatDonation] = useState<Donation | null>(null);
    
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchDonatorNames = async () => {
            const donationsWithNames = await Promise.all(
                initialDonations.map(async (donation) => {
                    if (donation.ownerName) return donation;
                    try {
                        const userDoc = await getDoc(doc(db, 'users', donation.donatorId));
                        if(userDoc.exists()){
                            return { ...donation, ownerName: userDoc.data().displayName || 'Anonymous' };
                        }
                    } catch(e) {
                        console.error("Could not fetch donator's name", e);
                    }
                    return { ...donation, ownerName: 'Anonymous' };
                })
            );
            setDonations(donationsWithNames);
        };
        if(initialDonations.length > 0){
            fetchDonatorNames();
        } else {
            setDonations([]);
        }
    }, [initialDonations]);


    const handleOpenMessageModal = (donation: Donation) => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.uid === donation.donatorId) {
            alert("You cannot message yourself about your own item.");
            return;
        }
        setChatDonation(donation);
    };
    
    const suggestedMessages = [
        "Is this still available?",
        "I'm interested in this item.",
        "Can I arrange a pickup?",
    ];

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
                                <div className="mt-auto flex flex-col gap-2">
                                    <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                        onClick={() => setSelectedDonation(donation)}
                                    >
                                        View Details
                                    </button>
                                     <button onClick={() => handleOpenMessageModal(donation)} className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                        <MessageSquare size={16} className="mr-2"/>
                                        Message Donor
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* View Details Modal */}
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
                            onClick={() => {
                                handleOpenMessageModal(selectedDonation);
                                setSelectedDonation(null);
                            }}
                            className="w-full mt-4 flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                        >
                            <MessageSquare size={16} className="mr-2"/>
                            Message Donor
                        </button>
                    </div>
                </div>
            )}

            {/* Chat Modal */}
            {chatDonation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full h-[80vh] flex flex-col">
                         <header className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold">Message Donor About: {chatDonation.title}</h2>
                            <button onClick={() => setChatDonation(null)} className="text-gray-500 hover:text-gray-800">
                                <X size={24} />
                            </button>
                        </header>
                        <div className="flex-grow overflow-hidden">
                            <ChatApp 
                              donationId={chatDonation.id} 
                              receiverId={chatDonation.donatorId} 
                              receiverName={chatDonation.ownerName || 'Donor'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DonationsList;
