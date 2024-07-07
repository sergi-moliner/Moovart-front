export interface Artist {
  id: number;
  userId: number;
  name: string;
  email: string;
  city: string;
  bio: string;
  genre: string;
  experienceLevel: string;
  contactInfo: { [key: string]: string };
  profilePhotoId: number;
  featuredWorkPhotoId: number;
  cvUrl: string;
}
