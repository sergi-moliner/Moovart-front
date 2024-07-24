import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile, Photo } from '../../interfaces/profile';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-profile-detaill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-detaill.component.html',
  styleUrl: './profile-detaill.component.scss'
})
export class ProfileDetaillComponent implements OnInit {
  profile: Profile | null = null;
  loading = true;
  error = '';
  userId: number | null = null;
  photoUrls: Photo[] = [];
  selectedPhotoUrl: string | null = null;
  selectedPhotoIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id') ?? '0', 10);
      if (this.userId && !isNaN(this.userId)) {
        this.loadUserProfile(this.userId);
      } else {
        this.error = 'Invalid user ID';
        this.loading = false;
      }
    });
  }

  loadUserProfile(userId: number): void {
    this.profileService.getProfile(userId).subscribe({
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
