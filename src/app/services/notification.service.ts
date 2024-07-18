import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  createNotification(notification: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, notification);
  }

  getNotificationsByUserId(recipient_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${recipient_id}`);
  }

  markNotificationAsRead(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { read: true });
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

