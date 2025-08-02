import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged, 
    signInAnonymously,
    signInWithCustomToken 
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    serverTimestamp,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyBPwUQdGDovmI5WZjiPzBTfpXk4wnS83Mc",
    authDomain: "neighborlycalgary.firebaseapp.com",
    projectId: "neighborlycalgary",
    storageBucket: "neighborlycalgary.firebasestorage.app",
    messagingSenderId: "1045114625371",
    appId: "1:1045114625371:web:974f887ca67ceb96034e7e",
    measurementId: "G-6V4EK3B14H"
  };

// --- Firebase Initialization ---
// Check if app is already initialized
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    app = initializeApp(firebaseConfig, "chat_app_" + Math.random());
}

const auth = getAuth(app);
const db = getFirestore(app);

// --- Helper Functions & Constants ---
const APP_ID = 'neighborlycalgary';
const API_KEY = ""; // This will be handled by the environment.
const CHAT_STARTERS = [
    "Is this still available?",
    "I'm interested in this item.",
    "Can I arrange a pickup?",
];


const getDonationDetails = async (donationId) => {
    if(!donationId) return null;
    const donationRef = doc(db, 'donations', donationId);
    const docSnap = await getDoc(donationRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.warn(`Donation ${donationId} not found.`);
        return null;
    }
};

// --- React Components ---

const Message = ({ message, currentUserId }) => {
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

interface ChatAppProps {
    donationId: string;
    receiverId: string;
}


const ChatApp: React.FC<ChatAppProps> = ({ donationId, receiverId }) => {
    // --- State Management ---
    const [currentUser, setCurrentUser] = useState(null);
    const [currentChat, setCurrentChat] = useState({ donationId, receiverId });
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [donationInfo, setDonationInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);


    // --- Effects ---

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                 setError("You must be logged in to chat.");
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser || !currentChat.donationId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        getDonationDetails(currentChat.donationId)
            .then(data => {
                if (data) setDonationInfo(data);
                else setError(`Donation with ID ${currentChat.donationId} not found.`);
            })
            .catch(err => {
                console.error("Error fetching donation:", err);
                setError("Failed to fetch donation details.");
            });

        const chatId = [currentUser.uid, currentChat.receiverId].sort().join('_') + `_${currentChat.donationId}`;
        const messagesRef = collection(db, 'message', chatId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
            setIsLoading(false);

        }, (err) => {
            console.error("Error listening to messages:", err);
            setError("Failed to load messages.");
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, currentChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    // --- Event Handlers ---

    const sendMessage = async (text) => {
        if (text.trim() === '' || !currentUser) return;

        const chatId = [currentUser.uid, currentChat.receiverId].sort().join('_') + `_${currentChat.donationId}`;
        const messagesRef = collection(db, 'message', chatId, 'messages');
        const chatDocRef = doc(db, 'message', chatId);

        try {
            await addDoc(messagesRef, {
                text: text,
                senderId: currentUser.uid,
                receiverId: currentChat.receiverId,
                timestamp: serverTimestamp(),
            });

            const chatDoc = await getDoc(chatDocRef);
            const donatorInfo = await getDoc(doc(db, "users", currentChat.receiverId));
            const donatorName = donatorInfo.data()?.displayName || 'Anonymous';


            if (!chatDoc.exists()) {
                await setDoc(chatDocRef, {
                    participants: [currentUser.uid, currentChat.receiverId].sort(),
                     participantNames: {
                        [currentUser.uid]: currentUser.displayName || 'Anonymous',
                        [currentChat.receiverId]: donatorName,
                    },
                    itemId: currentChat.donationId,
                    itemName: donationInfo?.title || "Item",
                    createdAt: serverTimestamp(),
                    lastMessage: null,
                });
            }

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
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(newMessage);
    };

    // --- Render Logic ---

    if (!currentUser) {
        return <div className="flex items-center justify-center h-full bg-gray-100"><p>Authenticating...</p></div>;
    }
    
    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
             <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
                <div className="max-w-4xl mx-auto w-full flex-1">
                    {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
                    {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
                    
                    {!isLoading && !error && messages.length === 0 && (
                        <div className="text-center h-full flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start the Conversation</h3>
                            <p className="text-gray-500 mb-6">Not sure what to say? Try one of these starters.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
                                {CHAT_STARTERS.map((starter, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(starter)}
                                        className="p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 shadow-sm"
                                    >
                                        {starter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map(msg => <Message key={msg.id} message={msg} currentUserId={currentUser.uid} />)}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Message Input Form */}
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
