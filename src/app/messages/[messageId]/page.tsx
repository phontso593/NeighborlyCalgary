
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { collection, query, onSnapshot, addDoc, orderBy, doc, getDoc, Timestamp, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Message, Conversation } from '@/types';
import { SendHorizonal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ChatPage = ({ params }: { params: { messageId: string } }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = params.messageId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage = searchParams.get('message');
    if (initialMessage) {
        setNewMessage(decodeURIComponent(initialMessage));
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && chatId) {
      // Fetch conversation details
      const convoDocRef = doc(db, 'message', chatId);
      const unsubConvo = onSnapshot(convoDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const convoData = { id: docSnap.id, ...docSnap.data() } as Conversation;
          if (!convoData.participants.includes(user.uid)) {
            router.push('/messages'); // Not a participant
            return;
          }
          setConversation(convoData);
        } else {
          router.push('/messages'); // Not found
        }
      });


      // Listen for messages
      const messagesColRef = collection(db, 'message', chatId, 'messages');
      const q = query(messagesColRef, orderBy('timestamp', 'asc'));

      const unsubMessages = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(msgs);
      });

      return () => {
        unsubConvo();
        unsubMessages();
      };
    }
  }, [user, chatId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !newMessage.trim() || !conversation) return;

    setIsSending(true);

    const otherParticipantId = conversation.participants.find(p => p !== user.uid);
    if (!otherParticipantId) {
        console.error("Could not find the other participant.");
        setIsSending(false);
        return;
    }

    const messageData = {
        text: newMessage,
        senderId: user.uid,
        receiverId: otherParticipantId,
        timestamp: serverTimestamp(),
      };

    try {
      // Add new message to subcollection
      await addDoc(collection(db, 'message', chatId, 'messages'), messageData);

      // Update the lastMessage on the parent chat document
      const chatDocRef = doc(db, 'message', chatId);
      await updateDoc(chatDocRef, {
        lastMessage: {
            text: newMessage,
            senderId: user.uid,
            timestamp: serverTimestamp(),
        }
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    } finally {
        setIsSending(false);
    }
  };

  const getOtherParticipantName = () => {
    if (!conversation || !user) return 'User';
    const otherId = conversation.participants.find(p => p !== user.uid);
    return otherId ? conversation.participantNames[otherId] : 'Unknown User';
  };

  if (loading || !conversation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto bg-white border-x border-gray-200">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        <Link href="/messages" className="text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{getOtherParticipantName()}</h2>
          <p className="text-sm text-gray-500 italic">Regarding: {conversation.itemName}</p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.senderId === user?.uid ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
            disabled={isSending}
          />
          <button type="submit" disabled={isSending || !newMessage.trim()} className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300">
            <SendHorizonal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
