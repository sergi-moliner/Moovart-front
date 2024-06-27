import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ArtistService } from '../../../services/artist.service';
import { Artist } from '../../../interfaces/artist';
import { Portfolio } from '../../../interfaces/portfolio';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-artist-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule

  ],
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent implements OnInit {
  artistForm!: FormGroup;
  artist!: Artist;
  isEditing = false;

  constructor(private fb: FormBuilder, private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.getArtistProfile().subscribe((data) => {
      this.artist = data;
      this.initForm();
    });
  }

  initForm() {
    this.artistForm = this.fb.group({
      name: [this.artist.name, Validators.required],
      email: [this.artist.email, [Validators.required, Validators.email]],
      city: [this.artist.city, Validators.required],
      bio: [this.artist.bio, Validators.required],
      genre: [this.artist.genre, Validators.required],
      experienceLevel: [this.artist.experienceLevel, Validators.required],
      contactInfo: this.fb.group(this.artist.contactInfo),
      profilePhotoUrl: [this.artist.profilePhotoUrl],
      featuredWorkPhotoUrl: [this.artist.featuredWorkPhotoUrl],
      cvUrl: [this.artist.cvUrl],
      portfolios: this.fb.array(this.artist.portfolios.map(this.createPortfolioGroup))
    });
  }

  createPortfolioGroup(portfolio: Portfolio): FormGroup {
    return this.fb.group({
      id: [portfolio.id],
      artistId: [portfolio.artistId],
      url: [portfolio.url, Validators.required],
      type: [portfolio.type, Validators.required]
    });
  }

  get portfolios(): FormArray {
    return this.artistForm.get('portfolios') as FormArray;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onSubmit() {
    if (this.artistForm.valid) {
      this.artistService.updateArtistProfile(this.artistForm.value).subscribe((updatedArtist) => {
        this.artist = updatedArtist;
        this.isEditing = false;
      });
    }
  }

  onPhotoUpload(event: any, photoType: string) {
    const file = event.target.files[0];
    if (file) {
      this.artistService.uploadPhoto(file).subscribe((response) => {
        if (photoType === 'profile') {
          this.artistForm.patchValue({ profilePhotoUrl: response.url });
        } else if (photoType === 'featured') {
          this.artistForm.patchValue({ featuredWorkPhotoUrl: response.url });
        }
      });
    }
  }

  onPortfolioUpload(event: any, type: 'image' | 'document' | 'video') {
    const file = event.target.files[0];
    if (file) {
      this.artistService.uploadPortfolio(file, type).subscribe((response) => {
        this.portfolios.push(this.createPortfolioGroup({ id: 0, artistId: this.artist.id, url: response.url, type }));
      });
    }
  }
}
