export interface Event {
  id: number;
  user_id: number;
  title: string;
  description: string;
  opening_date: string;
  closing_date: string;
  adress: string;
  city: string;
  event_type: string;
  sougth_artists: string;
  optional_detaills: string;
  quantity: number;
  color: string;
  all_day: boolean;
  profile_photo_id: number;
  confirmed: boolean;
  confirmation_date: string;
}
