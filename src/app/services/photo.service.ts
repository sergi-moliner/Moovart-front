import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:3000/photos';

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/${id}`);
  }

  uploadPhoto(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(`${this.apiUrl}/upload`, formData);
  }
  
  updatePhoto(id: number, photo: Photo): Observable<Photo> {
    return this.http.put<Photo>(`${this.apiUrl}/${id}`, photo);
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
