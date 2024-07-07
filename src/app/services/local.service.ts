import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from '../interfaces/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private apiUrl = 'http://localhost:3000/locals';

  constructor(private http: HttpClient) { }

  getLocals(filterParams?: any): Observable<Local[]> {
    let params = new HttpParams();
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key]) {
          params = params.append(key, filterParams[key]);
        }
      });
    }
    return this.http.get<Local[]>(this.apiUrl, { params });
  }

  getLocalPhotos(localId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${localId}/photos`);
  }

  getLocal(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.apiUrl}/${id}`);
  }

  createLocal(local: Local): Observable<Local> {
    return this.http.post<Local>(this.apiUrl, local);
  }

  updateLocal(id: number, local: Local): Observable<Local> {
    return this.http.put<Local>(`${this.apiUrl}/${id}`, local);
  }

  deleteLocal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
