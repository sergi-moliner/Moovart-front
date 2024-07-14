import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  profile: Profile | undefined;
  loading = true;
  error = '';
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    console.log('User ID de view:', this.userId); // Log de depuración

    if (this.userId && !isNaN(this.userId)) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (data) => {
          console.log('Profile data received:', data); // Log de depuración
          this.profile = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load profile:', err); // Log de depuración
          this.error = 'Failed to load profile';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid user ID';
      this.loading = false;
    }
  }

  editProfile() {
    if (this.profile && this.userId) {
      this.router.navigate([`profile/${this.userId}/edit`]);
    }
  }
}
