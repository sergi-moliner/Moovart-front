import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { HomeComponent } from '../../components/home/home.component';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbar,
    MatListModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  isLoggedIn = false;
  opened = false;
  notificationCount = 0;
  userProfilePicture = '/assets/imgs/default-profile-picture.png';
  userName = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    this.subscriptions.add(this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadUserProfile();
      } else {
        this.resetUserProfile();
      }
    }));

    this.subscriptions.add(this.authService.profileChanged.subscribe(user => {
      if (user) {
        this.updateUserProfile(user);
      } else {
        this.resetUserProfile();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadUserProfile(): void {
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (this.userId && !isNaN(this.userId)) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (data) => {
          this.updateUserProfile(data);
        },
        error: (err) => {
          console.error('Failed to load profile:', err);
        }
      });
    }
  }

  private updateUserProfile(data: any): void {
    this.userId = data.id;
    this.userProfilePicture = data.profile_photo_url
      ? `http://localhost:3000${data.profile_photo_url}`
      : '/assets/imgs/default-profile-picture.png';
    this.userName = data.name;
  }

  private resetUserProfile(): void {
    this.userId = null;
    this.userProfilePicture = '/assets/imgs/default-profile-picture.png';
    this.userName = '';
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (this.userId) {
      this.router.navigate(['/profile', this.userId]);
    }
  }

}
