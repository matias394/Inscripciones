import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrls: ['./crear-inscripcion.component.scss'],
})
export class CrearInscripcionComponent {
  public tableData: any[] = [];
  public inscripcionesPerPage: number = 10;
  public allInscripcionesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number;
  public filteredData: any[] = [];
  searchTerm$ = new Subject<string>();
  public selectedRow: any;
  public user: any;
  public name: string;
  public lastname: string;
  public currentSort: string = 'id,desc';
  currentSearchTerm: string = '';
  listFiltered: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit() {
    this.getInscripciones(0, 'id,desc', '');
    this.searchTerm$.subscribe((term) => {
      if (term !== '') {
        this.getInscripciones(0, 'id,desc', term);
      } else {
        this.getInscripciones(0, 'id,desc', '');
      }
    });
  }

  selectRow(row: any) {
    this.selectedRow = row;
  }

  getInscripciones(page: number, sort: string, searchTerm: string) {
    this.sharedService
      .getInscripciones(page, this.inscripcionesPerPage, sort, searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allInscripcionesPages = response.totalPages;
      });
  }

  onInscripcionesPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getInscripciones(startPage, this.currentSort, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.getInscripciones(0, 'id,desc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.getInscripciones(0, 'id,desc', searchTerm);
    this.currentPage = 1;
  }

  sortByName() {
    this.currentSort = 'nombre';
    this.getInscripciones(0, this.currentSort, this.currentSearchTerm);
  }

  sortByCategoria() {
    this.currentSort = 'organismoCategoria.categoria.nombre,asc';
    this.getInscripciones(0, this.currentSort, this.currentSearchTerm);
  }

  backToFirst() {
    this.currentPage = 1;
  }

  goNewInscription(inscripcion: any) {
    this.tokenService.saveInscription(inscripcion);
    this.router.navigate(['nueva'], {
      relativeTo: this.route,
    });
  }

  getEstado(estado?: any) {
    return estado === null || !estado
      ? 'Sin estado'
      : estado === 1
      ? 'Abierta'
      : 'Cerrada';
  }
}
