import { User } from './user';

export interface Profile {
  id: number;
  user_id: number;
  bio?: string;
  website?: string;
  profile_photo_url: string;
  User: User;
}
