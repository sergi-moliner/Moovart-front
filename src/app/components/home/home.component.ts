import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { EventService } from '../../services/event.service';
import { Profile } from '../../interfaces/profile';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredArtists: Profile[] = [];
  upcomingEvents: Event[] = [];
  maxFeaturedArtists: number = 4; // Número máximo de artistas destacados a mostrar
  maxUpcomingEvents: number = 4; // Número máximo de eventos próximos a mostrar

  constructor(private artistService: ProfileService, private eventService: EventService) { }

  ngOnInit(): void {
    this.artistService.getProfiles().subscribe(profiles => {
      const artists = profiles.filter(profile => profile.user_type === 'artist');
      this.featuredArtists = this.getRandomSubset(artists, this.maxFeaturedArtists);
    });

    this.eventService.getEvents().subscribe(events => {
      this.upcomingEvents = this.getRandomSubset(events, this.maxUpcomingEvents);
    });
  }

  private getRandomSubset<T>(array: T[], size: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }
}
