import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  getProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`).pipe(
      tap(profile => {
        console.log('Profile data from service:', profile); // Verificar la estructura de la respuesta
      })
    );
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

  uploadPhotos(id: number, photos: File[]): Observable<any> {
    const formData = new FormData();
    photos.forEach(photo => formData.append('photos', photo));
    return this.http.post(`${this.apiUrl}/${id}/photos`, formData);
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/photo/${photoId}`);
  }
}
