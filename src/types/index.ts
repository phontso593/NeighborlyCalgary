
export interface Donation {
    id: string;
    title: string;
    description: string;
    category: string;
    condition: string;
    status: string;
    imageUrl?: string;
    createdAt?: { seconds: number };
    donatorId?: string;
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
