import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AsistenciasService } from '@modules/usuario-profesor/asistencias/asistencias.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss'],
})
export class AsistenciasComponent {
  public user: any;
  public tableData: any[] = [];
  public idNumber: number = 0;
  public windowWidth: number;
  public disabledValue: boolean;
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public listaVacia: boolean = false;
  public sinResultados: boolean = false;
  public allPages: number = 0;
  public qrValidate: boolean = false;
  private resizeSub: Subscription;
  public currentSort: string = 'id,asc';
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private asistenciasService: AsistenciasService,
    private windowDimensionService: WindowDimensionService,
    private tokenStorage: TokenStorageService
  ) {
    this.user = this.tokenStorage.getUser();
    this.idNumber = this.user.usuario;
  }

  ngOnInit() {
    this.fetchSedes(0, 'id,asc', '');

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

  fetchSedes(page: number, sort: string, searchTerm: string) {
    this.asistenciasService
      .getSedesAsignadas(
        this.idNumber,
        page,
        this.itemsPerPage,
        sort,
        searchTerm
      )
      .subscribe((response) => {
        this.tableData = response.content;
        this.allPages = response.totalPages;
        if (searchTerm === '') {
          this.listaVacia = this.tableData.length === 0;
          this.sinResultados = false;
        } else {
          this.sinResultados = this.tableData.length === 0;
          this.listaVacia = false;
        }

        this.currentSearchTerm = searchTerm;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchSedes(startPage, this.currentSort, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchSedes(0, 'id,asc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchSedes(0, 'id,asc', searchTerm);
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
    this.fetchSedes(0, this.currentSort, this.currentSearchTerm);
  }
}
