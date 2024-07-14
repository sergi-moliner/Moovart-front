import { User } from './user';

export interface Profile {
  id_profile: number;
  user_id: number;
  name: string;
  email: string;
  city: string;
  user_type: string;
  profile_photo_url: string;
  bio: string;
  website: string;
  events: any[]; // Puedes definir una interfaz específica para eventos si lo deseas
  notifications: any[]; // Puedes definir una interfaz específica para notificaciones si lo deseas
  artist?: any; // Puedes definir una interfaz específica para artistas si lo deseas
  local?: any; // Puedes definir una interfaz específica para locales si lo deseas
  photos?: string[];
}
