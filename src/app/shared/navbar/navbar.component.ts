import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { HomeComponent } from '../../components/home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userId: number | null = 1;
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
    console.log('User ID de nabar:', this.userId); // Log de depuración
    if (this.userId && !isNaN(this.userId)) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (data) => {
          console.log('Profile data received at navbar:', data); // Log de depuración
          this.profile = data;
          this.userProfilePicture = data.profile_photo_url ? `http://localhost:3000${data.profile_photo_url}` : '/assets/imgs/default-profile-picture.png';
          this.userName = data.name;
        },
        error: (err) => {
          console.error('Failed to load profile:', err); // Log de depuración
        }
      });
    }
  }




  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  goToProfile() {
    if (this.userId !== null) {
      this.router.navigate(['/profile', this.userId]);
    }
  }
}
