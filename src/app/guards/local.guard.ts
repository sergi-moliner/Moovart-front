import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return new Observable(observer => {
      this.userService.getCurrentUser().subscribe(user => {
        if (user && user.user_type === 'local') {
          observer.next(true);
        } else {
          this.router.navigate(['/not-authorized']);
          observer.next(false);
        }
        observer.complete();
      }, err => {
        this.router.navigate(['/login']);
        observer.next(false);
        observer.complete();
      });
    });
  }
}
