
import React, { useState, useEffect, useRef } from 'react';
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    serverTimestamp,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';

const CHAT_STARTERS = [
    "Is this still available?",
    "I'm interested in this item.",
    "Can I arrange a pickup?",
];

const Message = ({ message, currentUserId }: { message: any, currentUserId: string | null }) => {
    const { text, senderId, timestamp } = message;
    const isSender = senderId === currentUserId;
    const messageClass = isSender ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start';
    const time = timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '...';

    return (
        <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} mb-4`}>
            <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${messageClass}`}>
                <p className="text-sm">{text}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">{time}</span>
        </div>
    );
};

const ChatApp = ({ donationId, receiverId, receiverName }: { donationId: string, receiverId: string, receiverName: string }) => {
    const { user: currentUser, loading: authLoading } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (authLoading || !currentUser || !donationId || !receiverId) {
            setIsLoading(false);
            return;
        }
    
        const chatId = [currentUser.uid, receiverId].sort().join('_') + `_${donationId}`;
        const chatDocRef = doc(db, 'chats', chatId);
        const messagesRef = collection(db, 'chats', chatId, 'messages');
    
        const setupChatAndListener = async () => {
            try {
                setIsLoading(true);
                setError(null);
    
                const chatDocSnap = await getDoc(chatDocRef);
                if (!chatDocSnap.exists()) {
                    const donationDoc = await getDoc(doc(db, "donations", donationId));
                    const donationTitle = donationDoc.data()?.title || 'Item';
    
                    await setDoc(chatDocRef, {
                        participants: [currentUser.uid, receiverId].sort(),
                        participantNames: {
                            [currentUser.uid]: currentUser.displayName || 'Anonymous',
                            [receiverId]: receiverName,
                        },
                        itemId: donationId,
                        itemName: donationTitle,
                        createdAt: serverTimestamp(),
                        lastMessage: null
                    });
                }
    
                const q = query(messagesRef, orderBy('timestamp', 'asc'));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setMessages(msgs);
                    setIsLoading(false);
                }, (err) => {
                    console.error("Error listening to messages:", err);
                    setError("Failed to load messages.");
                    setIsLoading(false);
                });
    
                return unsubscribe;
    
            } catch (err) {
                console.error("Error setting up chat:", err);
                setError("Could not initialize chat.");
                setIsLoading(false);
                return undefined;
            }
        };
        
        let unsubscribe: (() => void) | undefined;
        setupChatAndListener().then(unsub => {
            if (unsub) {
                unsubscribe = unsub;
            }
        });
    
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentUser, donationId, receiverId, receiverName, authLoading]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (text.trim() === '' || !currentUser) return;
    
        const chatId = [currentUser.uid, receiverId].sort().join('_') + `_${donationId}`;
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const chatDocRef = doc(db, 'chats', chatId);
    
        try {
            await addDoc(messagesRef, {
                text: text,
                senderId: currentUser.uid,
                receiverId: receiverId,
                timestamp: serverTimestamp(),
            });
    
            await setDoc(chatDocRef, {
                lastMessage: {
                    text: text,
                    senderId: currentUser.uid,
                    timestamp: serverTimestamp()
                }
            }, { merge: true });
    
            setNewMessage('');
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Couldn't send the message. Please try again.");
        }
    };
    
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(newMessage);
    };

    if (authLoading) {
        return <div className="flex items-center justify-center h-full bg-gray-100"><p>Authenticating...</p></div>;
    }
    
    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
                <div className="max-w-4xl mx-auto w-full flex-1">
                    {isLoading && <div className="flex justify-center items-center h-full"><p className="text-center text-gray-500">Loading chat...</p></div>}
                    {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
                    
                    {!isLoading && !error && messages.length === 0 && (
                        <div className="text-center h-full flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start the Conversation</h3>
                            <p className="text-gray-500 mb-6">Not sure what to say? Try one of these starters.</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {CHAT_STARTERS.map((starter, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(starter)}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 shadow-sm"
                                    >
                                        {starter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map(msg => <Message key={msg.id} message={msg} currentUserId={currentUser?.uid || null} />)}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <input
                            type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button type="submit" disabled={!newMessage.trim()} className="bg-blue-600 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 disabled:bg-blue-300 transition">
                            Send
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
};

export default ChatApp;
