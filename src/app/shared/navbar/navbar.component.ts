import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  userId: number | null = null;
  isLoggedIn = false;
  opened = false;
  notificationCount = 0;
  userProfilePicture = '/assets/imgs/default-profile-picture.png';
  userName = '';
  profile: any = {};

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (this.userId && !isNaN(this.userId)) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (data) => {
          this.profile = data;
          if (!data.profile_photo_url || data.profile_photo_url === '/uploads/null') {
            this.userProfilePicture = '/assets/imgs/default-profile-picture.png';
          } else {
            this.userProfilePicture = `http://localhost:3000${data.profile_photo_url}`;
          }
          this.userName = data.name;
        },
        error: (err) => {
          console.error('Failed to load profile:', err);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  goToProfile() {
    if (this.userId !== null) {
      this.router.navigate(['/profile', this.userId]);
    }
  }
}
