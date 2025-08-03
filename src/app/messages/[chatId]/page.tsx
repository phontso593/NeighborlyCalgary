
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import ChatApp from '@/components/chat';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Conversation } from '@/types';

const ConversationPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const chatId = Array.isArray(params.chatId) ? params.chatId[0] : params.chatId;

  useEffect(() => {
    if (authLoading || !user || !chatId) {
      if (!authLoading && !user) {
        router.push('/login');
      }
      return;
    }

    const fetchConversation = async () => {
      try {
        setLoading(true);
        const chatDocRef = doc(db, 'chats', chatId);
        const chatDocSnap = await getDoc(chatDocRef);

        if (chatDocSnap.exists()) {
          const convoData = chatDocSnap.data() as Conversation;
          // Ensure the current user is part of this conversation
          if (convoData.participants.includes(user.uid)) {
            setConversation({ id: chatDocSnap.id, ...convoData });
          } else {
            setError("You do not have permission to view this chat.");
          }
        } else {
          setError("Chat not found.");
        }
      } catch (e) {
        console.error("Error fetching conversation: ", e);
        setError("Failed to load conversation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [chatId, user, authLoading, router]);

  const getOtherParticipant = () => {
    if (!conversation || !user) return null;
    const otherId = conversation.participants.find(p => p !== user.uid);
    if (!otherId) return null;

    return {
      id: otherId,
      name: conversation.participantNames[otherId] || 'Unknown User'
    };
  };

  const otherParticipant = getOtherParticipant();

  if (loading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="mt-4 text-lg text-gray-600">Loading conversation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <Link href="/messages" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Back to Messages
        </Link>
      </div>
    );
  }

  if (!conversation || !otherParticipant) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
         <h2 className="text-2xl font-bold text-gray-800 mb-4">Conversation not found</h2>
         <Link href="/messages" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
           Back to Messages
         </Link>
       </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center p-4 border-b bg-gray-50 sticky top-0 z-10">
        <Link href="/messages" className="p-2 rounded-full hover:bg-gray-200 mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
            <h1 className="text-xl font-bold text-gray-800">
                Chat with {otherParticipant.name}
            </h1>
            <p className="text-sm text-gray-500">
                Regarding: {conversation.itemName}
            </p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <ChatApp
          donationId={conversation.itemId}
          receiverId={otherParticipant.id}
          receiverName={otherParticipant.name}
        />
      </div>
    </div>
  );
};

export default ConversationPage;
