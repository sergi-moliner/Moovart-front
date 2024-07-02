import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../interfaces/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-artists-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './artists-list.component.html',
  styleUrl: './artists-list.component.scss'
})
export class ArtistsListComponent implements OnInit {
  artists: Artist[] = [];
  filterForm: FormGroup;

  constructor(
    private artistService: ArtistService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    this.getArtists();
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  getArtists(filters?: any): void {
    this.artistService.getArtists(filters).subscribe((artists) => {
      this.artists = artists;
    }, (error) => {
      console.error('Error fetching artists:', error);
    });
  }

  applyFilters(filters: any): void {
    const filteredArtists = this.artists.filter(artist => {
      return (!filters.name || artist.name.toLowerCase().includes(filters.name.toLowerCase())) &&
             (!filters.genre || artist.genre?.toLowerCase().includes(filters.genre.toLowerCase()));
    });
    this.artists = filteredArtists;
  }
}
