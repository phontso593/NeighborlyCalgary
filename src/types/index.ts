export interface Donation {
    id: string;
    item: string;
    quantity: number;
    description: string;
    category: string;
    createdAt?: { seconds: number };
    uid?: string;
    donorName?: string;
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
