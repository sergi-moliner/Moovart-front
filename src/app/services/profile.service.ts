import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) { }

  getProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }

  updateProfile(id: number, profile: any): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile);
  }

  uploadProfilePhoto(id: number, file: File): Observable<{ profile_photo_url: string }> {
    const formData = new FormData();
    formData.append('profile_photo', file);

    return this.http.put<{ profile_photo_url: string }>(`${this.apiUrl}/${id}/photo`, formData);
  }
}
