import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private baseUrl = 'http://localhost:3000/photos';

  constructor(private http: HttpClient) {}

  uploadPhoto(photoData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, photoData);
  }

  getPhotos(entityType: string, entityId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${entityType}/${entityId}`);
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${photoId}`);
  }
}
