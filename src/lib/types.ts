export interface DonationItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  category: string;
  location: string;
  donor: string;
  tags: string[];
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
}
