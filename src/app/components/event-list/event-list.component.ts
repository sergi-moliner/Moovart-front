import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  searchTerm: string = '';
  filters = {
    city: '',
    eventType: ''
  };
  cities: string[] = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Zaragoza'];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      return (!this.filters.city || event.city === this.filters.city) &&
             (!this.filters.eventType || event.event_type === this.filters.eventType) &&
             (!this.searchTerm || event.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    });
  }
}
