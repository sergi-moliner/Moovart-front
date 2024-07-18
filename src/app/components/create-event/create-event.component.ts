import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  cities: string[] = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Zaragoza'];
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    const userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    console.log('User ID:', userId);
    this.eventForm = this.fb.group({
      user_id: [userId, Validators.required],
      title: ['', Validators.required],
      description: [''],
      opening_date: ['', Validators.required],
      closing_date: [''],
      address: [''],
      city: ['', Validators.required],
      event_type: ['', Validators.required],
      sought_artists: [''],
      contact_details: [''],
      optional_details: [''],
      quantity: [null],
      color: [''],
      all_day: [false],
      url: [''],
      confirmed: [false],
      confirmation_date: ['']
    });
  }

  ngOnInit(): void {}

  get title() { return this.eventForm.get('title'); }
  get opening_date() { return this.eventForm.get('opening_date'); }
  get city() { return this.eventForm.get('city'); }
  get event_type() { return this.eventForm.get('event_type'); }

  onSubmit() {
    console.log('Form submitted');
    if (this.eventForm.valid) {
      console.log('Form is valid');
      this.uploadFileAndSubmit();
    } else {
      console.log('Form is invalid');
      this.logFormErrors();
      this.eventForm.markAllAsTouched();
    }
  }

  logFormErrors() {
    for (const control in this.eventForm.controls) {
      if (this.eventForm.controls.hasOwnProperty(control)) {
        const formControl = this.eventForm.get(control);
        if (formControl && formControl.invalid) {
          console.log(`${control} is invalid:`, formControl.errors);
        }
      }
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private uploadFileAndSubmit(): void {
    if (this.selectedFile) {
      console.log('Uploading file...');
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      fetch('http://localhost:3000/upload', { // URL de tu backend para subir archivos
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
          this.eventForm.patchValue({ url: data.url });
          this.submitForm();
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    } else {
      this.submitForm();
    }
  }

  private submitForm(): void {
    console.log('Submitting form...');
    console.log(this.eventForm.value);
    this.eventService.createEvent(this.eventForm.value).subscribe(
      response => {
        console.log('Event creation successful', response);
        this.router.navigate(['/events']);
      },
      error => {
        console.error('Event creation failed', error);
      }
    );
  }
}
