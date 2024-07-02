export interface Event {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  opening_date: Date;
  closing_date?: Date;
  address?: string;
  city?: string;
  event_type: 'local' | 'collaboration';
  sought_artists?: string;
  contact_details?: any;
  optional_details?: string;
  quantity?: number;
  color?: string;
  all_day?: boolean;
  profile_photo_id?: number;
  confirmed: boolean;
  confirmation_date?: Date;
}
