import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
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
export class NavbarComponent {
  userId: number = 1; // Reemplaza con el ID del usuario actual
  isLoggedIn = false;
  opened = false;
  notificationCount = 0;
  userProfilePicture = '/proyecto/c9deb7fe244e7b4e31be87261c1910d4.jpg'; // Reemplaza con la ruta a una imagen por defecto
  userName = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {

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
    this.router.navigate(['/profile', this.userId]);
  }
}
