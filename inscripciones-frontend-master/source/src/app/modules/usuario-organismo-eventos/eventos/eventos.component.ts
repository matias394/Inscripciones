import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Inscripciones } from '@modules/usuario-organismo/asignar-profesores/interfaces';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent {
  public user: any;
  public usuarioId: any;
  public idOrganismo: any;
  public idNumber: number = 0;
  public cursoData: any;
  public idInsc: number = 0;
  public listaInscripciones: Array<Inscripciones> = [];
  public instanciaData: any;
  public expandContent: boolean = false;
  public expandContentIndex: boolean[] = [false];
  public expandSecondContent: boolean = false;
  public expandSecondContentIndex: boolean[] = [false];
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public isModalOpen: boolean = false;
  public currentPage: number = 1;
  public modalSwitch: boolean = false;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public windowWidth: number;
  public disabledValue: boolean;
  public instanciaSedeList = [];
  public listaVacia: boolean = false;
  public sinResultados: boolean = false;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public currentSort: string = 'id,desc';
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  constructor(
    private asignarService: AsignarProfesoresService,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.idOrganismo = this.tokenStorage.getUserData().organismo.id;
    this.usuarioId = this.tokenStorage.getUserData().id;
  }

  ngOnInit(): void {
    this.getLastInscripciones(0, 'id,desc', '');
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
    this.cursoData = null;
    this.instanciaData = null;
    this.expandContent = false;
    this.expandSecondContent = false;
    this.selectedId = 0;
    this.selectedIdTwo = null;
    this.resizeSub.unsubscribe();
  }

  fetchCursoData(id: number) {
    this.asignarService
      .getDataConsultaCursoInstancia(id)
      .subscribe((response) => {
        this.cursoData = response;
        this.instanciaData = response.instanciaData;
      });
  }

  //MODAL Y PAGINACION
  openModal(id: number) {
    this.isModalOpen = true;
    this.idInsc = id;
    this.fetchCursoData(this.idInsc);
  }

  closeModal() {
    this.isModalOpen = false;
    this.ngOnDestroy();
  }

  getLastInscripciones(page: number, sort: string, searchTerm: string) {
    this.asignarService
      .getListaInscripciones(
        this.idOrganismo,
        2,
        this.usuarioId,
        page,
        5,
        sort,
        searchTerm
      )
      .subscribe((response) => {
        this.listaInscripciones = response.content;
        this.allPages = response.totalPages;
        if (searchTerm === '') {
          this.listaVacia = this.listaInscripciones.length === 0;
          this.sinResultados = false;
        } else {
          this.sinResultados = this.listaInscripciones.length === 0;
          this.listaVacia = false;
        }

        this.currentSearchTerm = searchTerm;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getLastInscripciones(
      startPage,
      this.currentSort,
      this.currentSearchTerm
    );
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.getLastInscripciones(0, 'id,desc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.getLastInscripciones(0, 'id,desc', searchTerm);
    this.currentPage = 1;
  }
  //HABILITA QUE SE ABRA LA SEGUNDA TABLA
  expandRowContent(instancia: any, index: number) {
    this.asignarService
      .getDataConsultaCursoInstanciaSede(instancia.id)
      .subscribe((response) => {
        this.instanciaSedeList[index] = response;
        this.expandContentIndex[index] = !this.expandContentIndex[index];
        this.selectedId = instancia.id;
      });
  }

  //HABILITA QUE SE ABRA LA TABLA DE SEDES
  expandRowContentTwo(index: number) {
    this.expandSecondContentIndex[index] =
      !this.expandSecondContentIndex[index];
  }

  sortByName() {
    this.currentSort = 'nombre';
    this.getLastInscripciones(0, this.currentSort, this.currentSearchTerm);
  }

  sortByCategoria() {
    this.currentSort = 'organismoCategoria.categoria.nombre,asc';
    this.getLastInscripciones(0, this.currentSort, this.currentSearchTerm);
  }
}
