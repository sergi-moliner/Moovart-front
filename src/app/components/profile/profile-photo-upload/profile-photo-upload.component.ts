import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'app-profile-photo-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-photo-upload.component.html',
  styleUrls: ['./profile-photo-upload.component.scss']
})
export class ProfilePhotoUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Input() currentPhotoUrl: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
