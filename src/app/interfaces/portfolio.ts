export interface Portfolio {
  id: number;
  artistId: number;
  url: string;
  type: 'image' | 'document' | 'video';
}
