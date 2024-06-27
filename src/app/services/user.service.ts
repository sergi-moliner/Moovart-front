import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userTypeKey = 'user-type';
  private currentUserTypeSubject: BehaviorSubject<string | null>;
  public currentUserType: Observable<string | null>;

  constructor() {
    const userType = this.getUserTypeFromLocalStorage();
    this.currentUserTypeSubject = new BehaviorSubject<string | null>(userType);
    this.currentUserType = this.currentUserTypeSubject.asObservable();
  }

  setUserType(userType: string | null) {
    if (userType) {
      localStorage.setItem(this.userTypeKey, userType);
    } else {
      localStorage.removeItem(this.userTypeKey);
    }
    this.currentUserTypeSubject.next(userType);
  }

  getUserType(): Observable<string | null> {
    return this.currentUserType;
  }

  getUserTypeFromLocalStorage(): string | null {
    return localStorage.getItem(this.userTypeKey);
  }
}
