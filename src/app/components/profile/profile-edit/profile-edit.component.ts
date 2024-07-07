import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { ProfilePhotoUploadComponent } from '../profile-photo-upload/profile-photo-upload.component';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ProfilePhotoUploadComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  profile: Profile | undefined;
  loading = true;
  error = '';
  cities = ['Barcelona', 'Madrid', 'Valencia', 'Seville', 'Zaragoza'];
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      user_type: ['', Validators.required],
      bio: [''],
      website: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.profileService.getProfile(userId).subscribe({
          next: (data) => {
            this.profile = data;
            this.loading = false;
            this.populateForm(data);
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
    });
  }

  populateForm(profile: Profile): void {
    this.profileForm.patchValue({
      name: profile.User.name,
      city: profile.User.city,
      user_type: profile.User.user_type,
      bio: profile.bio,
      website: profile.website
    });
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('name', this.profileForm.get('name')?.value);
      formData.append('city', this.profileForm.get('city')?.value);
      formData.append('user_type', this.profileForm.get('user_type')?.value);
      formData.append('bio', this.profileForm.get('bio')?.value);
      formData.append('website', this.profileForm.get('website')?.value);

      this.profileService.updateProfile(this.profile?.user_id || 0, formData).subscribe({
        next: () => {
          if (this.selectedFile) {
            this.profileService.uploadProfilePhoto(this.profile?.user_id || 0, this.selectedFile).subscribe({
              next: () => {
                this.router.navigate(['/profile', this.profile?.user_id]);
              },
              error: (err) => {
                this.error = 'Failed to upload profile photo';
              }
            });
          } else {
            this.router.navigate(['/profile', this.profile?.user_id]);
          }
        },
        error: (err) => {
          this.error = 'Failed to update profile';
        }
      });
    }
  }

  get name() { return this.profileForm.get('name'); }
  get city() { return this.profileForm.get('city'); }
  get user_type() { return this.profileForm.get('user_type'); }
  get bio() { return this.profileForm.get('bio'); }
  get website() { return this.profileForm.get('website'); }
}
