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
  selectedFiles: File[] = [];
  photoUrls: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (this.userId && !isNaN(this.userId)) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (data) => {
          this.profile = data;
          this.loading = false;
          this.photoUrls = data.photos || []; // Asegúrate de que las fotos estén incluidas
        },
        error: (err) => {
          this.error = 'Failed to load profile';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid user ID';
      this.loading = false;
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files) as File[];
      this.selectedFiles = this.selectedFiles.slice(0, 5);
    }
  }

  uploadPhotos(): void {
    if (this.userId && this.selectedFiles.length > 0) {
      this.profileService.uploadPhotos(this.userId, this.selectedFiles).subscribe({
        next: (data) => {
          this.photoUrls = data.photoUrls;
        },
        error: (err) => {
          console.error('Failed to upload photos:', err);
        }
      });
    }
  }

  editProfile() {
    if (this.profile && this.userId) {
      this.router.navigate([`profile/${this.userId}/edit`]);
    }
  }
}
