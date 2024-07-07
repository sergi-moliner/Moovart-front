import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { Local, User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-local-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './local-list.component.html',
  styleUrl: './local-list.component.scss'
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
  cities: string[] = ['City1', 'City2', 'City3'];
  locals: any[] = [];
  filteredLocals: any[] = [];
  localPhotos: { [key: number]: any[] } = {};

  constructor(private localService: LocalService, private router: Router) { }

  ngOnInit(): void {
    this.localService.getLocals().subscribe(locals => {
      this.locals = locals;
      this.filteredLocals = locals;

      // Extraer ciudades únicas
      this.cities = [...new Set(locals.map(local => local.city))];

      // Obtener fotos para cada local
      locals.forEach(local => {
        this.localService.getLocalPhotos(local.id).subscribe(photos => {
          this.localPhotos[local.id] = photos;
        });
      });
    });
  }

  search(): void {
    this.filteredLocals = this.locals.filter(local => local.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  applyFilters(): void {
    this.filteredLocals = this.locals.filter(local => {
      const exhibitionSpace = local.exhibition_space || 0; // Valor por defecto
      return (
        (!this.filters.city || local.city === this.filters.city) &&
        (!this.filters.minSpace || exhibitionSpace >= this.filters.minSpace) &&
        (!this.filters.maxSpace || exhibitionSpace <= this.filters.maxSpace)
      );
    });
  }

  viewDetails(local: Local): void {
    this.router.navigate(['/local', local.id]);
  }
}
