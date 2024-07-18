import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private apiUrl = 'http://localhost:3000/interests';

  constructor(private http: HttpClient) {}

  markInterest(interest: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, interest);
  }

  getInterestsByEventId(event_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/event/${event_id}`);
  }

  updateInterestStatus(id: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { status });
  }
}
