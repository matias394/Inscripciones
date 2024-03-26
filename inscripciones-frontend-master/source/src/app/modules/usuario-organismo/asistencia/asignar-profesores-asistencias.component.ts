import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
@Component({
  selector: 'app-asignar-profesores-asistencias',
  templateUrl: './asignar-profesores-asistencias.component.html',
  styleUrls: ['./asignar-profesores-asistencias.component.scss'],
})
export class AsignarProfesoresAsistenciasComponent {
  private dataUser: any;
  public organismoId: number;
  public usuarioId: number;
  public sedeTipoDto: any;
  public listaVacia: boolean = false;
  public sinResultados: boolean = false;
  public listSedes: any[] = [];
  public listSedesFiltered: any[] = [];
  public windowWidth: number;
  public disabledValue: boolean;
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public qrValidate: boolean = false;
  public currentSort: string = 'id,asc';
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;
  constructor(
    private asignarProfesoresService: AsignarProfesoresService,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
    this.organismoId = this.dataUser.organismo.id;
    this.usuarioId = this.dataUser.id;
  }

  ngOnInit(): void {
    this.getSedes(0, 'id,asc', '');

    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  //TIPO ORGANISMO CURSOS: 1
  getSedes(page: number, sort: string, searchTerm: string) {
    this.asignarProfesoresService
      .getSedesEnOrganismos(
        this.organismoId,
        1,
        this.usuarioId,
        page,
        5,
        sort,
        searchTerm
      )
      .subscribe((response) => {
        this.listSedes = response.content;
        this.allPages = response.totalPages;
        if (searchTerm === '') {
          this.listaVacia = this.listSedes.length === 0;
          this.sinResultados = false;
        } else {
          this.sinResultados = this.listSedes.length === 0;
          this.listaVacia = false;
        }

        this.currentSearchTerm = searchTerm;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getSedes(startPage, this.currentSort, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.getSedes(0, 'id,asc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.getSedes(0, 'id,asc', searchTerm);
    this.currentPage = 1;
  }

  qrActivated() {
    this.qrValidate = true;
  }

  closeModalQR() {
    this.qrValidate = false;
  }

  sortByName() {
    this.currentSort = 'nombre';
    this.getSedes(0, this.currentSort, this.currentSearchTerm);
  }
}
