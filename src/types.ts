export type MarketStatus = 'upcoming' | 'recruiting' | 'closed';

export interface Market {
  id: string;
  title: string;
  summary: string;
  city: string;
  district: string;
  address: string;
  venue: string;
  startDate: string;
  endDate: string;
  time: string;
  image: string;
  category: string[];
  status: MarketStatus;
  recruitingUntil?: string;
  fee?: string;
  organizer: string;
  indoor: boolean;
  parking: string;
  pet: string;
  rainPolicy: string;
  sellerIds: string[];
  programs: { time: string; title: string }[];
  tags: string[];
  views: number;
  likes: number;
}

export interface Seller {
  id: string;
  name: string;
  handle: string;
  category: string;
  intro: string;
  image: string;
  location: string;
  followers: number;
  marketCount: number;
  verified: boolean;
  socials: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    threads?: string;
    shop?: string;
  };
  specialties: string[];
  upcomingMarketIds: string[];
}

export interface FeedPost {
  id: string;
  sellerId?: string;
  author: string;
  avatarText: string;
  createdAt: string;
  type: '출점소식' | '신상품' | '제작기록' | '이벤트' | '후기';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface PromoEvent {
  id: string;
  title: string;
  description: string;
  period: string;
  badge: string;
  image: string;
  cta: string;
}
