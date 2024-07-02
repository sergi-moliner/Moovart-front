import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'auth-token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  profileChanged = new EventEmitter<User | null>(); // Emitir null cuando se desloguee

  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user).pipe(
      tap((res: any) => {
        this.setToken(res.data.accessToken); // Cambiado a res.data.accessToken
        this.profileChanged.emit(res.data.user); // Emitir evento
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        this.setToken(res.data.accessToken); // Cambiado a res.data.accessToken
        this.profileChanged.emit(res.data.user); // Emitir evento
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.profileChanged.emit(null); // Emitir null
    this.router.navigate(['/login']);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getProfile(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<User>(`${this.baseUrl}/auth/profile`, { headers }).pipe(
      tap(user => {
        this.profileChanged.emit(user); // Emitir evento
      })
    );
  }

  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/check-email`, { params: { email } });
  }

}
