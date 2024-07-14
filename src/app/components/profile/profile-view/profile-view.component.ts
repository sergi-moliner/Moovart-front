import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { Profile, Photo } from '../../../interfaces/profile'; // Asegúrate de importar la interfaz Photo
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, AfterViewInit {
  profile!: Profile;
  loading = true;
  error = '';
  userId: number | null = null;
  selectedFiles: File[] = [];
  photoUrls: Photo[] = [];
  photoIdToDelete: number | null = null;
  deleteModal: any;
  selectedPhotoUrl: string | null = null;
  selectedPhotoIndex: number | null = null;

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
          this.photoUrls = data.photos || [];
          this.initializeTooltips();
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

  ngAfterViewInit(): void {
    this.initializeTooltips();
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files).slice(0, 5) as File[];
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

  confirmDelete(photoId: number): void {
    this.photoIdToDelete = photoId;
    const modalElement = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  deletePhoto(): void {
    if (this.photoIdToDelete !== null) {
      this.profileService.deletePhoto(this.photoIdToDelete).subscribe({
        next: () => {
          this.photoUrls = this.photoUrls.filter(photo => photo.id !== this.photoIdToDelete);
          this.photoIdToDelete = null;
          this.initializeTooltips();
          const modalElement = document.getElementById('deleteModal');
          const modal = bootstrap.Modal.getInstance(modalElement!);
          modal?.hide();
        },
        error: (err) => {
          console.error('Failed to delete photo:', err);
        }
      });
    }
  }
  showPhoto(photo: Photo): void {
    this.selectedPhotoUrl = 'http://localhost:3000' + photo.url;
    this.selectedPhotoIndex = this.photoUrls.findIndex(p => p.id === photo.id);
    const modalElement = document.getElementById('viewPhotoModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
    setTimeout(() => {
      this.initializeZoom();
    }, 500); // Añade un pequeño retraso para asegurarte de que la imagen está completamente cargada
  }

  prevPhoto(): void {
    if (this.selectedPhotoIndex !== null) {
      this.selectedPhotoIndex = (this.selectedPhotoIndex - 1 + this.photoUrls.length) % this.photoUrls.length;
      this.selectedPhotoUrl = 'http://localhost:3000' + this.photoUrls[this.selectedPhotoIndex].url;
      setTimeout(() => {
        this.initializeZoom();
      }, 500); // Añade un pequeño retraso para asegurarte de que la imagen está completamente cargada
    }
  }

  nextPhoto(): void {
    if (this.selectedPhotoIndex !== null) {
      this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % this.photoUrls.length;
      this.selectedPhotoUrl = 'http://localhost:3000' + this.photoUrls[this.selectedPhotoIndex].url;
      setTimeout(() => {
        this.initializeZoom();
      }, 500); // Añade un pequeño retraso para asegurarte de que la imagen está completamente cargada
    }
  }


  initializeZoom(): void {
    setTimeout(() => {
      const zoomableImages = document.querySelectorAll('.zoomable');
      zoomableImages.forEach(image => {
        image.addEventListener('click', () => {
          image.classList.toggle('zoomed');
        });
      });
    }, 100);
  }
  editProfile() {
    if (this.profile && this.userId) {
      this.router.navigate([`profile/${this.userId}/edit`]);
    }
  }

  closeModal(event: MouseEvent): void {
    const modalElement = document.getElementById('viewPhotoModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    if ((event.target as HTMLElement).id === 'viewPhotoModal') {
      modal?.hide();
    }
  }

  initializeTooltips(): void {
    setTimeout(() => {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 100);
  }
}
