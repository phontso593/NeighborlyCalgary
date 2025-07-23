
'use client';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Conversation } from '@/types';
import { User, MessageSquareText } from 'lucide-react';

const MessagesPage = () => {
  const { user, loading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'message'),
        where('participants', 'array-contains', user.uid),
        orderBy('lastMessage.timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
        setConversations(convos);
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
      id: otherId,
      name: otherId ? convo.participantNames[otherId] : 'Unknown User',
    };
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) return '';
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
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
                <li key={convo.id}>
                  <Link href={`/messages/${convo.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-gray-200 p-2 rounded-full">
                        <User size={24} className="text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-md font-bold text-blue-700 truncate">{otherParticipant.name}</p>
                          <p className="text-xs text-gray-400">
                            {formatDate(convo.lastMessage?.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          <span className="font-medium">{convo.lastMessage?.senderId === user.uid ? 'You: ' : ''}</span>
                          {convo.lastMessage?.text || 'No messages yet.'}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 italic">
                          Regarding: {convo.itemName}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
