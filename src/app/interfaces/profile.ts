export interface Photo {
  id: number;
  url: string;
}

export interface Profile {
  id_user: number;
  user_id: number;
  name: string;
  email: string;
  city: string;
  user_type: string;
  profile_photo_url: string;
  bio: string;
  website: string;
  events: any[];
  notifications: any[];
  artist?: any;
  local?: any; 
  photos?: Photo[];
}
