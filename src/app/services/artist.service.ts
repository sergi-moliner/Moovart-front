import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:3000/artists'; // Asegúrate de que la URL es correcta

  constructor(private http: HttpClient) { }

  getArtists(filterParams?: any): Observable<Artist[]> {
    let params = new HttpParams();
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key]) {
          params = params.append(key, filterParams[key]);
        }
      });
    }
    return this.http.get<Artist[]>(this.apiUrl, { params });
  }
  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  updateArtist(id: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${id}`, artist);
  }

  deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
