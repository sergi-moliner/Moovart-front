import { User } from './user';

export interface Profile {
  id_profile: number;
  user_id: number;
  name: string;
  city: string;
  user_type: string;
  email: string;
  bio?: string;
  website?: string;
  profile_photo_url: string;
  User: User;
}
