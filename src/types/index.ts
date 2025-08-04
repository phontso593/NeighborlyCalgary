
export interface Item {
    id: string;
    title: string;
    description: string;
    category: string;
    condition: string;
    status: 'available' | 'claimed';
    imageUrl?: string;
    createdAt?: { seconds: number };
    donatorId: string;
    ownerName?: string;
    claimedBy?: string | null;
}

export interface Request {
  id: string;
  item: string;
  quantity: number;
  description: string;
  category: string;
  createdAt?: { seconds: number };
  uid?: string;
  requesterName?: string;
}

export interface User {
  uid: string;
  displayName?: string | null;
  email?: string | null;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: any;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: { [key: string]: string };
  itemId: string;
  itemName: string;
  itemImageUrl?: string;
  lastMessage?: {
    text: string;
    senderId: string;
    timestamp: any;
  };
  createdAt: any;
}

export type Donation = Item;
