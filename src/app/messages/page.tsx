'use client';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Conversation } from '@/types';
import { MessageSquareText, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import ChatApp from '@/components/chat';

const MessagesPage = () => {
  const { user, loading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', user.uid)
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const convosWithoutImages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));

        const convosWithImages = await Promise.all(
          convosWithoutImages.map(async (convo) => {
            if (convo.itemId) {
              const itemDocRef = doc(db, 'donations', convo.itemId);
              const itemDocSnap = await getDoc(itemDocRef);
              if (itemDocSnap.exists()) {
                return { ...convo, itemImageUrl: itemDocSnap.data().imageUrl || null };
              }
            }
            return { ...convo, itemImageUrl: null };
          })
        );
        
        convosWithImages.sort((a, b) => {
          const timeA = a.lastMessage?.timestamp?.seconds || a.createdAt?.seconds || 0;
          const timeB = b.lastMessage?.timestamp?.seconds || b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setConversations(convosWithImages);
        setIsLoadingConversations(false);
      }, (error) => {
        console.error("Error fetching conversations:", error)
        setIsLoadingConversations(false);
      });

      return () => unsubscribe();
    } else if (!loading) {
      setIsLoadingConversations(false);
    }
  }, [user, loading]);

  const handleDeleteConversation = async (e: React.MouseEvent, chatId: string) => {
    e.preventDefault(); // Prevent the Link from navigating
    e.stopPropagation(); // Stop event bubbling

    if (window.confirm('Are you sure you want to delete this conversation? This cannot be undone.')) {
        try {
            const chatDocRef = doc(db, 'chats', chatId);
            await deleteDoc(chatDocRef);
            // The onSnapshot listener will automatically update the UI
        } catch (error) {
            console.error("Error deleting conversation: ", error);
            alert("Failed to delete conversation. Please try again.");
        }
    }
  };


  if (loading || isLoadingConversations) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading messages...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
        <p className="text-gray-600 mb-6">You must be logged in to view your messages.</p>
        <Link href="/login" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Go to Login
        </Link>
      </div>
    );
  }

  const getOtherParticipant = (convo: Conversation) => {
    const otherId = convo.participants.find(p => p !== user.uid);
    return {
      id: otherId || '',
      name: otherId ? convo.participantNames[otherId] : 'Unknown User',
    };
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) return '';
    const date = new Date(timestamp.seconds * 1000);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString();
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">My Messages</h1>
        <p className="mt-2 text-lg text-gray-600">Your conversations with other community members.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        {conversations.length === 0 ? (
          <div className="text-center p-12">
            <MessageSquareText size={48} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">No conversations yet</h3>
            <p className="mt-1 text-gray-500">Start a conversation by messaging a user from an item listing.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {conversations.map(convo => {
              const otherParticipant = getOtherParticipant(convo);
              return (
                <li key={convo.id} className="group">
                  <div
                    onClick={() => setSelectedConversation(convo)}
                    className="flex-grow flex items-start space-x-4 p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={convo.itemImageUrl || "https://placehold.co/60x60.png"}
                        alt={convo.itemName}
                        width={60}
                        height={60}
                        className="w-16 h-16 object-cover rounded-md bg-gray-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                              Chat with {otherParticipant.name}
                          </p>
                          <p className="text-md font-bold text-blue-700 truncate">{convo.itemName}</p>
                        </div>
                        <p className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {formatDate(convo.lastMessage?.timestamp)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-2">
                        <span className="font-medium">{convo.lastMessage?.senderId === user.uid ? 'You: ' : ''}</span>
                        {convo.lastMessage?.text || 'No messages yet.'}
                      </p>
                    </div>
                     <button 
                        onClick={(e) => handleDeleteConversation(e, convo.id)}
                        className="ml-4 p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Delete conversation"
                      >
                        <Trash2 size={20} />
                      </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Chat Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full h-[80vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Message Donor About: {selectedConversation.itemName}</h2>
                <button onClick={() => setSelectedConversation(null)} className="text-gray-500 hover:text-gray-800">
                    <X size={24} />
                </button>
                </header>
                <div className="flex-grow overflow-hidden">
                    <ChatApp 
                      donationId={selectedConversation.itemId} 
                      receiverId={getOtherParticipant(selectedConversation).id} 
                      receiverName={getOtherParticipant(selectedConversation).name}
                    />
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
