import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-photo-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-photo-upload.component.html',
  styleUrls: ['./profile-photo-upload.component.scss']
})
export class ProfilePhotoUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  profilePhotoUrl: string | ArrayBuffer | null = '';

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhotoUrl = reader.result;
        this.fileSelected.emit(file);
      };
      reader.readAsDataURL(file);
    }
  }
}

