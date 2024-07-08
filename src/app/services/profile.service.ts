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

  updateProfile(id: number, profileData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, profileData);
  }
  uploadProfilePhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return this.http.post<any>(`${this.apiUrl}/upload-profile-picture`, formData);
  }

  getProfilePicture(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/profile-picture`);
  }
}
