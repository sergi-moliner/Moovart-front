import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'user-fullname';
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor() {
    const fullName = this.getFullNameFromLocalStorage();
    this.currentUserSubject = new BehaviorSubject<string | null>(fullName);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setFullName(name: string | null) {
    if (name) {
      localStorage.setItem(this.userKey, name);
    } else {
      localStorage.removeItem(this.userKey);
    }
    this.currentUserSubject.next(name);
  }

  getFullName(): Observable<string | null> {
    return this.currentUser;
  }

  getFullNameFromLocalStorage(): string | null {
    return localStorage.getItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return this.getFullNameFromLocalStorage() !== null;
  }
}
