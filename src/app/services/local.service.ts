import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from '../interfaces/local';

@Injectable({
  providedIn: 'root'
})
export class localService {
  private apiUrl = 'http://localhost:3000/locals';

  constructor(private http: HttpClient) {}

  getlocals(): Observable<Local[]> {
    return this.http.get<Local[]>(this.apiUrl);
  }

  getlocal(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.apiUrl}/${id}`);
  }

  createlocal(local: Local): Observable<Local> {
    return this.http.post<Local>(this.apiUrl, local);
  }

  updatelocal(id: number, local: Local): Observable<Local> {
    return this.http.put<Local>(`${this.apiUrl}/${id}`, local);
  }

  deletelocal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
