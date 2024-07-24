import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-local-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.scss']
})
export class LocalListComponent implements OnInit {
  searchTerm: string = '';
  showFilters: boolean = true;
  sortOrder: string = 'name';
  filters: any = {
    city: '',
    minSpace: '',
    maxSpace: ''
  };
  cities: string[] = ['City1', 'City2', 'City3']; // Estas listas deben ser dinámicas si es necesario
  locals: Profile[] = [];
  filteredLocals: Profile[] = [];
  localPhotos: { [key: number]: any[] } = {};

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      this.locals = profiles.filter(profile => profile.user_type === 'local');
      this.filteredLocals = this.locals;

      // Extraer ciudades únicas
      this.cities = [...new Set(this.locals.map(local => local.city))];

      // Obtener fotos para cada local
      this.locals.forEach(local => {
        this.localPhotos[local.id_user] = local.photos ?? [];
      });
    });
  }

  search(): void {
    this.filteredLocals = this.locals.filter(local => local.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  applyFilters(): void {
    this.filteredLocals = this.locals.filter(local => {

      return (
        (!this.filters.city || local.city === this.filters.city)

      );
    });
  }

  viewDetails(local: Profile): void {
    this.router.navigate(['/user', local.id_user]);
  }
}
