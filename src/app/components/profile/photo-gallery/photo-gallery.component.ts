import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../services/photo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.scss'
})
export class PhotoGalleryComponent implements OnInit {
  photos: any[] = [];
  selectedFile: File | null = null;
  userId: number | null = null;

  constructor(
    private photoService: PhotoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = 1; // poner logica bien
  }

  loadPhotos(): void {
    if (this.userId !== null) {
      this.photoService.getPhotos(this.userId).subscribe(
        (data: any[]) => {
          this.photos = data;
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading photos:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile && this.userId !== null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('user_id', this.userId.toString());

      this.photoService.uploadPhoto(formData).subscribe(
        (response) => {
          this.photos.push(response);
          this.selectedFile = null;
        },
        (error: HttpErrorResponse) => {
          console.error('Error uploading photo:', error);
        }
      );
    }
  }

  onDelete(photoId: number): void {
    this.photoService.deletePhoto(photoId).subscribe(
      () => {
        this.photos = this.photos.filter(photo => photo.id_photo !== photoId);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting photo:', error);
      }
    );
  }
}
