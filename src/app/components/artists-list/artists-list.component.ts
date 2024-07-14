import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../interfaces/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-artists-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
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
  cities: string[] = ['City1', 'City2', 'City3'];
  genres: string[] = ['Genre1', 'Genre2', 'Genre3'];
  experienceLevels: string[] = ['Beginner', 'Intermediate', 'Expert'];
  artists: any[] = [
    { name: 'Artist1', city: 'City1', genre: 'Genre1', experienceLevel: 'Beginner' },
    { name: 'Artist2', city: 'City2', genre: 'Genre2', experienceLevel: 'Intermediate' },
    { name: 'Artist3', city: 'City3', genre: 'Genre3', experienceLevel: 'Expert' }
  ];
  filteredArtists: any[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getArtists().subscribe(artists => {
      this.artists = artists;
      this.filteredArtists = artists;
    });
  }

  search(): void {
    this.filteredArtists = this.artists.filter(artist => artist.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  applyFilters(): void {
    this.filteredArtists = this.artists.filter(artist => {
      return (
        (!this.filters.city || artist.city === this.filters.city) &&
        (!this.filters.genre || artist.genre === this.filters.genre) &&
        (!this.filters.experienceLevel || artist.experienceLevel === this.filters.experienceLevel)
      );
    });
  }

  viewDetails(artist: any): void {
    // Logic to open the modal or navigate to the details page
  }
}
