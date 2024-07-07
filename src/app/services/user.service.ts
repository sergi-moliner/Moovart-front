import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User, Artist, Local } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.profileChanged.subscribe(user => {
      console.log('User profile changed:', user);
      this.currentUser = user;
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user);
  }

  getArtists(filterParams?: any): Observable<Artist[]> {
    let params = new HttpParams();
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key]) {
          params = params.append(key, filterParams[key]);
        }
      });
    }
    return this.http.get<Artist[]>(`${this.apiUrl}/artists`, { params });
  }

  getLocals(filterParams?: any): Observable<Local[]> {
    let params = new HttpParams();
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key]) {
          params = params.append(key, filterParams[key]);
        }
      });
    }
    return this.http.get<Local[]>(`${this.apiUrl}/locals`, { params });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateArtist(id_artist: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/artist/${id_artist}`, artist);
  }

  updateLocal(id_local: number, local: Local): Observable<Local> {
    return this.http.put<Local>(`${this.apiUrl}/local/${id_local}`, local);
  }

  uploadProfilePhoto(userId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/uploadProfilePhoto`, formData);
  }

  setUserType(type: 'artist' | 'local'): void {
    if (this.currentUser) {
      this.currentUser.user_type = type;
    }
  }

  getUserType(): Observable<'artist' | 'local'> {
    return of(this.currentUser ? this.currentUser.user_type : 'local'); // Defaulting to 'local' if currentUser is null, adjust as necessary
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }


}

