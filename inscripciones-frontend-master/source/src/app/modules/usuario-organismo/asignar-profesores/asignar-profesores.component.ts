import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { Inscripciones } from '@modules/usuario-organismo/asignar-profesores/interfaces';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';

@Component({
  selector: 'app-asignar-profesores',
  templateUrl: './asignar-profesores.component.html',
  styleUrls: ['./asignar-profesores.component.scss'],
})
export class AsignarProfesoresComponent implements OnInit {
  private dataUser: any;
  public idOrganismo: any;
  public listaInscripciones: Array<Inscripciones> = [];
  public listaPaginableInscripciones: Array<Inscripciones> = [];
  public inscripcionesPerPage: number = 5;
  public allInscripcionesPages: number = 0;
  public currentPage: number = 1;
  public listFiltered: any[] = [];
  public usuarioId: number;
  public listaVacia: boolean = false;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public windowWidth: number;
  public allPages: number = 0;
  public sinResultados: boolean = false;
  public currentSort: string = 'id,desc';
  btnClickInscribite$ = new Subject();
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;

  constructor(
    private router: Router,
    private asignarService: AsignarProfesoresService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private windowDimensionService: WindowDimensionService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
    this.idOrganismo = this.tokenStorage.getUserData().organismo.id;
    this.usuarioId = this.tokenStorage.getUserData().id;
  }

  ngOnInit(): void {
    this.getListaInscripciones(0, 'id,desc', '');

    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  //SERVICIOS

  getListaInscripciones(page: number, sort: string, searchTerm: string) {
    this.asignarService
      .getListaInscripciones(
        this.idOrganismo,
        1,
        this.usuarioId,
        page,
        5,
        sort,
        searchTerm
      )
      .subscribe((response) => {
        this.listaPaginableInscripciones = response.content;
        this.allInscripcionesPages = response.totalPages;
        if (searchTerm === '') {
          this.listaVacia = this.listaPaginableInscripciones.length === 0;
          this.sinResultados = false;
        } else {
          this.sinResultados = this.listaPaginableInscripciones.length === 0;
          this.listaVacia = false;
        }

        this.currentSearchTerm = searchTerm;
      });
  }

  //PAGINACION

  onInscripcionesPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getListaInscripciones(
      startPage,
      this.currentSort,
      this.currentSearchTerm
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getListaInscripciones(
      startPage,
      this.currentSort,
      this.currentSearchTerm
    );
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.getListaInscripciones(0, 'id,desc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.getListaInscripciones(0, 'id,desc', searchTerm);
    this.currentPage = 1;
  }

  goToAssits(id: number, nombreInstancia: string) {
    this.tokenStorage.saveInstanciaName(nombreInstancia);
    this.router.navigate(['./inscripcion', id], {
      relativeTo: this.route,
    });
  }

  sortByName() {
    this.currentSort = 'nombre';
    this.getListaInscripciones(0, this.currentSort, this.currentSearchTerm);
  }

  sortByCategoria() {
    this.currentSort = 'organismoCategoria.categoria.nombre,asc';
    this.getListaInscripciones(0, this.currentSort, this.currentSearchTerm);
  }
}
