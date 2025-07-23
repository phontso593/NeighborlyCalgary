
'use client';
import {useState} from "react";
import Image from "next/image";
import type { Donation } from "@/types";
import { Tag, HeartHandshake, CalendarDays, MessageSquare, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, doc, setDoc, Timestamp, addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DonationsListProps {
    donations: Donation[];
}

const DonationsList: React.FC<DonationsListProps> = ({ donations }) => {
    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
    const [messageModalDonation, setMessageModalDonation] = useState<Donation | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    
    const { user } = useAuth();
    const router = useRouter();

    const handleOpenMessageModal = (donation: Donation) => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.uid === donation.donatorId) {
            alert("You cannot message yourself about your own item.");
            return;
        }
        setMessageModalDonation(donation);
    };

    const handleSendMessage = async () => {
        if (!user || !messageModalDonation || !newMessage.trim()) return;
    
        setIsSending(true);
    
        const chatId = [user.uid, messageModalDonation.donatorId].sort().join('_') + `_${messageModalDonation.id}`;
    
        try {
            const chatDocRef = doc(db, 'message', chatId);
            const chatDoc = await getDoc(chatDocRef);
    
            if (!chatDoc.exists()) {
                // Chat doesn't exist, create it with all required fields
                const donatorInfo = await getDoc(doc(db, "users", messageModalDonation.donatorId));
                const donatorName = donatorInfo.data()?.displayName || 'Anonymous';
    
                await setDoc(chatDocRef, {
                    participants: [user.uid, messageModalDonation.donatorId].sort(),
                    participantNames: {
                        [user.uid]: user.displayName || 'Anonymous',
                        [messageModalDonation.donatorId]: donatorName,
                    },
                    itemId: messageModalDonation.id,
                    itemName: messageModalDonation.title,
                    createdAt: serverTimestamp(),
                    lastMessage: null,
                });
            }
    
            // Add the new message to the subcollection
            const messagesColRef = collection(db, 'message', chatId, 'messages');
            await addDoc(messagesColRef, {
                text: newMessage,
                senderId: user.uid,
                receiverId: messageModalDonation.donatorId,
                timestamp: serverTimestamp(),
            });
    
            // Update lastMessage on the conversation
            await setDoc(chatDocRef, {
                lastMessage: {
                    text: newMessage,
                    senderId: user.uid,
                    timestamp: serverTimestamp()
                }
            }, { merge: true });
    
            // Navigate to chat page
            router.push(`/messages/${chatId}?message=${encodeURIComponent(newMessage)}`);
    
        } catch (error) {
            console.error("Error creating or sending message:", error);
            alert("Could not start a conversation. Please check your connection and security rules, then try again.");
        } finally {
            setIsSending(false);
            setMessageModalDonation(null);
            setNewMessage('');
        }
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
                                <p className="text-sm text-gray-700 flex-grow mb-4 h-16 overflow-hidden">
                                    {donation.description}
                                </p>
                                <div className="mt-auto flex flex-col gap-2">
                                    <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                        onClick={() => setSelectedDonation(donation)}
                                    >
                                        View Details
                                    </button>
                                     <button onClick={() => handleOpenMessageModal(donation)} className="w-full flex items-center justify-center bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                                        <MessageSquare size={16} className="mr-2"/>
                                        Message {donation.ownerName || 'User'}
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
                            Message {selectedDonation.ownerName || 'User'}
                        </button>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {messageModalDonation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setMessageModalDonation(null)}>
                    <div className="bg-white rounded-lg shadow-xl p-0 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
                        <header className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold">Message {messageModalDonation.ownerName || 'Donor'}</h2>
                            <button onClick={() => setMessageModalDonation(null)} className="text-gray-500 hover:text-gray-800">
                                <X size={24} />
                            </button>
                        </header>
                        <div className="p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <Image src={messageModalDonation.imageUrl || `https://placehold.co/600x400.png`} alt={messageModalDonation.title} width={64} height={64} className="rounded-md object-cover" />
                                <div>
                                    <h3 className="font-semibold">{messageModalDonation.title}</h3>
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                {suggestedMessages.map((msg, index) => (
                                    <button key={index} onClick={() => setNewMessage(msg)} className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                        {msg}
                                    </button>
                                ))}
                            </div>
                            
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Select a message or type your own..."
                                className="w-full p-2 border border-gray-300 rounded-md min-h-[100px] focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">Don't share your email, phone number or financial information.</p>
                        </div>

                        <footer className="flex justify-end gap-3 p-4 bg-gray-50 border-t">
                            <button onClick={() => setMessageModalDonation(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">
                                Cancel
                            </button>
                            <button onClick={handleSendMessage} disabled={isSending || !newMessage.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2">
                                <MessageSquare size={16} />
                                {isSending ? 'Sending...' : 'Send message'}
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DonationsList;
