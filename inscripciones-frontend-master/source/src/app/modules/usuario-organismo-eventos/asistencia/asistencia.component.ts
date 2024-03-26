import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent {
  private dataUser: any;
  public usuarioId: number;
  public organismoId: number;
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public sedeTipoDto: any;
  public listaVacia: boolean = false;
  public sinResultados: boolean = false;
  public listSedes: any[] = [];
  public windowWidth: number;
  public currentSort: string = 'id,asc';
  public disabledValue: boolean;
  public qrValidate: boolean = false;
  private resizeSub: Subscription;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
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

  //TIPO ORGANISMO EVENTO: 2
  getSedes(page: number, sort: string, searchTerm: string) {
    this.asignarProfesoresService
      .getSedesEnOrganismos(
        this.organismoId,
        2,
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
