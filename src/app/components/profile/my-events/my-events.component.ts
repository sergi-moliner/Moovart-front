import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';



@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent implements OnInit {
  myEvents: any[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('user-id') ?? '0', 10);
    if (userId) {
      this.eventService.getEventsByUserId(userId).subscribe(events => {
        this.myEvents = events;
        this.loadInterestedUsers();
      });
    }
  }

  loadInterestedUsers(): void {
    this.myEvents.forEach(event => {
      this.eventService.getInterestedUsers(event.id_event).subscribe(users => {
        const profileObservables = users.map((user: InterestedUser) =>
          this.profileService.getProfile(user.user_id).pipe(
            map(profile => ({
              ...user,
              User: {
                ...user.User,
                id: user.user_id, 
                name: profile.name,
                profile_photo_url: profile.profile_photo_url
              }
            }))
          )
        );

        forkJoin(profileObservables).subscribe(updatedUsers => {
          event.interestedUsers = updatedUsers;
        });
      });
    });
  }

  getUserProfilePicture(user: any): string {
    if (user.profile_photo_url && user.profile_photo_url !== '/uploads/null') {
      return `http://localhost:3000${user.profile_photo_url}`;
    } else {
      return '/assets/imgs/default-profile-picture.png';
    }
  }

  viewEvent(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }

  editEvent(eventId: number): void {
    this.router.navigate(['/events/edit', eventId]);
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId.toString()).subscribe(() => {
        this.myEvents = this.myEvents.filter(event => event.id_event !== eventId);
      });
    }
  }

  trackByEventId(index: number, event: any): number {
    return event.id_event;
  }

  scrollLeft(eventId: number): void {
    const element = document.getElementById(`interested-users-${eventId}`);
    if (element) {
      element.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(eventId: number): void {
    const element = document.getElementById(`interested-users-${eventId}`);
    if (element) {
      element.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  canScrollLeft(eventId: number): boolean {
    const element = document.getElementById(`interested-users-${eventId}`);
    return element ? element.scrollLeft > 0 : false;
  }

  canScrollRight(eventId: number): boolean {
    const element = document.getElementById(`interested-users-${eventId}`);
    return element ? element.scrollWidth - element.clientWidth > element.scrollLeft : false;
  }
}

interface InterestedUser {
  id_interest: number;
  user_id: number;
  event_id: number;
  status: string;
  timestamp: string;
  User: {
    id?: number;
    name: string;
    profile_photo_url?: string;
  };
}
