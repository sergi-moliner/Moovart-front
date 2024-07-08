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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
