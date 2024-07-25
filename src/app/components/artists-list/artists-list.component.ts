import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-artists-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, RouterModule ],
  templateUrl: './artists-list.component.html',
  styleUrl: './artists-list.component.scss'
})
export class ArtistsListComponent implements OnInit {
  searchTerm: string = '';
  showFilters: boolean = true;
  sortOrder: string = 'name';
  filters: any = {
    city: '',
    genre: '',
    experienceLevel: ''
  };
  cities: string[] = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Zaragoza']; 
  genres: string[] = ['Genre1', 'Genre2', 'Genre3'];
  experienceLevels: string[] = ['Beginner', 'Intermediate', 'Expert'];
  artists: Profile[] = [];
  filteredArtists: Profile[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      this.artists = profiles.filter(profile => profile.user_type === 'artist');
      this.filteredArtists = this.artists;
    });
  }

  search(): void {
    this.filteredArtists = this.artists.filter(artist => artist.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  applyFilters(): void {
    this.filteredArtists = this.artists.filter(artist => {
      return (
        (!this.filters.city || artist.city === this.filters.city)

      );
    });
  }

  viewDetails(artist: Profile): void {

  }
}
