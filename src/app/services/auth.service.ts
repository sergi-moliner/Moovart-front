// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'auth-token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, user).pipe(
      tap((res: any) => {
        this.setToken(res.accessToken);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        this.setToken(res.accessToken);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}
