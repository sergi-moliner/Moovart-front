export interface Notification {
  id: number;
  user_id: number;
  subscription_id: number;
  messsage: string;
  read: boolean;
  date: string;
}
