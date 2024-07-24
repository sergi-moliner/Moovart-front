import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  registerInterest(event_id: number, user_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/interest`, { event_id, user_id });
  }

  getInterestedUsers(event_id: number): Observable<any> {
    console.log('Fetching interested users for event', event_id);
    return this.http.get<any[]>(`${this.apiUrl}/${event_id}/interested-users`);
  }

  getEventsByUserId(user_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${user_id}`);
  }
  
}
