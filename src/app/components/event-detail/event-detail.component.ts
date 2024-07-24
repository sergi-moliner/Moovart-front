import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(
        eventData => {
          this.event = eventData;
          this.loading = false;
        },
        error => {
          console.error('Error fetching event:', error);
          this.error = 'Error fetching event details';
          this.loading = false;
        }
      );
    }
  }

  registerInterest(): void {
    const userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (userId && this.event) {
      this.eventService.registerInterest(this.event.id_event, userId).subscribe(
        response => {
          console.log('Interest registered successfully', response);
          alert('You have registered your interest!');
        },
        error => {
          console.error('Error registering interest', error);
        }
      );
    }
  }
}
