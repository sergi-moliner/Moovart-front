export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  city: string;
  user_type: 'artist' | 'local';


}

export interface Artist extends User {
  id_artist: number;
  user_id: number;
  bio?: string;
  contact_info?: string;
  cv?: string;
  featured?: string;
  profile_photo_id?: number;
  featured_work_photo_id?: number;
  genre?: string;
  experience_level?: string;
}

export interface Local extends User {
  id_local: number;
  user_id: number;
  address?: string;
  bio?: string;
  exhibition_space?: number;
  accepted_sizes?: string;
  contact_info?: string;
  latitude?: number;
  longitude?: number;
  profile_photo_id?: number;
}
