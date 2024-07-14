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
  private userIdKey = 'user-id';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  profileChanged = new EventEmitter<User | null>();

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
        this.setToken(res.data.accessToken);
        this.setUserId(res.data.user.id.toString()); // Guardar ID del usuario como cadena
        this.profileChanged.emit(res.data.user);
        this.loggedIn.next(true);
        this.router.navigate(['/profile']);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        this.setToken(res.data.accessToken);
        this.setUserId(res.data.user.id.toString()); // Guardar ID del usuario como cadena
        this.profileChanged.emit(res.data.user);
        this.loggedIn.next(true);
        this.router.navigate(['/home']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey); // Eliminar ID del usuario
    this.loggedIn.next(false);
    this.profileChanged.emit(null);
    this.router.navigate(['/home']);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUserId(userId: string): void { // Nuevo método para guardar ID del usuario
    localStorage.setItem(this.userIdKey, userId);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null { // Nuevo método para obtener ID del usuario
    return localStorage.getItem(this.userIdKey);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getProfile(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<User>(`${this.baseUrl}/auth/profile`, { headers }).pipe(
      tap(user => {
        this.profileChanged.emit(user);
      })
    );
  }

  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/check-email`, { params: { email } });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/current-user'); // Cambiar por la ruta correcta
  }
}
