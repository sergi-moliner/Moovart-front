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
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  profile: Profile | undefined;
  profilePhotoUrl: string | null = 'assets/imgs/default-profile-picture.png';
  loading = true;
  error = '';
  cities = ['Barcelona', 'Madrid', 'Valencia', 'Seville', 'Zaragoza'];
  selectedFile: File | null = null;
  userId: number | null = null;

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
    this.userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (this.userId && !isNaN(this.userId)) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (data) => {
          this.profile = data;
          this.loading = false;
          if (!data.profile_photo_url || data.profile_photo_url === '/uploads/null') {
            this.profilePhotoUrl = '/assets/imgs/default-profile-picture.png';
          } else {
            this.profilePhotoUrl = `http://localhost:3000${data.profile_photo_url}`;
          }
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
  }

  populateForm(profile: Profile): void {
    this.profileForm.patchValue({
      name: profile.name,
      city: profile.city,
      user_type: profile.user_type,
      bio: profile.bio,
      website: profile.website
    });
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePhotoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.userId !== null) {
      const formData = new FormData();
      formData.append('name', this.profileForm.get('name')?.value);
      formData.append('city', this.profileForm.get('city')?.value);
      formData.append('user_type', this.profileForm.get('user_type')?.value);
      formData.append('bio', this.profileForm.get('bio')?.value);
      formData.append('website', this.profileForm.get('website')?.value);

      if (this.selectedFile) {
        formData.append('profile_photo', this.selectedFile);
      }

      this.profileService.updateProfile(this.userId, formData).subscribe({
        next: (data) => {
          this.router.navigate(['/profile', this.userId]);
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
          this.error = 'Failed to update profile';
        }
      });
    } else {
      console.error('Form is invalid or userId is null');
    }
  }

  get name() { return this.profileForm.get('name'); }
  get city() { return this.profileForm.get('city'); }
  get user_type() { return this.profileForm.get('user_type'); }
  get bio() { return this.profileForm.get('bio'); }
  get website() { return this.profileForm.get('website'); }
}
