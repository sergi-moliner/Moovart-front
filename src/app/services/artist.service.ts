// services/artist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = 'http://localhost:3000/artists';

  constructor(private http: HttpClient) {}

  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getArtistProfile(): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/profile`);
  }

  updateArtistProfile(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.baseUrl}/profile`, artist);
  }

  uploadPhoto(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.baseUrl}/upload-photo`, formData);
  }

  uploadPortfolio(file: File, type: 'image' | 'document' | 'video'): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post<{ url: string }>(`${this.baseUrl}/upload-portfolio`, formData);
  }
}
