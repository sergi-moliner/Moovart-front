import { Portfolio } from './portfolio';

export interface Artist {
  id: number;
  userId: number;
  name: string;
  email: string;
  city: string;
  bio: string;
  genre: string;
  experienceLevel: string;
  contactInfo: { [key: string]: string }; // For storing social media links and other contacts
  profilePhotoId: number;
  featuredWorkPhotoId: number;
  cvUrl: string;
  portfolios: Portfolio[];
}
