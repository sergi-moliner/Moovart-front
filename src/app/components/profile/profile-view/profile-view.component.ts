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
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent implements OnInit {
  userId: number = 1; // Reemplaza con el ID del usuario actual
  profile: Profile | undefined;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      console.log('User ID:', userId); // Log de depuración
      if (userId) {
        this.profileService.getProfile(userId).subscribe({
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
    });
  }

  editProfile(){
    this.router.navigate(['profile//edit', this.userId]);
  }
}
