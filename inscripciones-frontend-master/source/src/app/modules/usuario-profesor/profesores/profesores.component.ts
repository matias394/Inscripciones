import { Subscription, Subject } from 'rxjs';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ProfesoresService } from '@modules/usuario-profesor/profesores/profesores.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss'],
})
export class ProfesoresComponent {
  public user: any;
  public tableData: any[] = [];
  public cursoData: any;
  public instanciaData: any;
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public isModalOpen: boolean = false;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number = 0;
  public idInsc: number = 0;
  public windowWidth: number;
  public disabledValue: boolean;
  public listaVacia: boolean = false;
  public currentSort: string = 'id,desc';
  public sinResultados: boolean = false;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  openModal(id: number) {
    this.isModalOpen = true;
    this.idInsc = id;
    this.fetchCursoData(this.idInsc);
  }

  closeModal() {
    this.isModalOpen = false;
    this.ngOnDestroy();
  }

  constructor(
    private profesoresService: ProfesoresService,
    private windowDimensionService: WindowDimensionService,
    private tokenStorage: TokenStorageService
  ) {
    this.user = this.tokenStorage.getUser();
    this.idNumber = this.user.usuario;
  }

  ngOnInit() {
    this.fetchCursos(this.idNumber, 0, 'id,desc', '');
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

  fetchCursos(id: number, page: number, sort: string, searchTerm: string) {
    this.profesoresService
      .getCursos(id, page, this.itemsPerPage, sort, searchTerm)
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
    this.fetchCursos(
      this.idNumber,
      startPage,
      this.currentSort,
      this.currentSearchTerm
    );
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchCursos(this.idNumber, 0, 'id,desc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchCursos(this.idNumber, 0, 'id,desc', searchTerm);
    this.currentPage = 1;
  }

  fetchCursoData(id: number) {
    this.profesoresService.getCursoData(id).subscribe((response) => {
      this.cursoData = response;
      this.instanciaData = response.instanciaData;
    });
  }

  //HABILITA QUE SE ABRA LA SEGUNDA TABLA
  expandRowContent(id: number) {
    this.expandContent = !this.expandContent;
    this.selectedId = id; //ID DE LA INSTANCIA
  }

  //HABILITA QUE SE ABRA LA TABLA DE SEDES
  expandRowContentTwo(id: number) {
    this.expandSecondContent = !this.expandSecondContent;
    this.selectedIdTwo = id; //ID DE LA INSCRIPCION
  }

  sortByName() {
    this.currentSort = 'nombre';
    this.fetchCursos(
      this.idNumber,
      0,
      this.currentSort,
      this.currentSearchTerm
    );
  }

  sortByCategoria() {
    this.currentSort = 'organismoCategoria.categoria.nombre,asc';
    this.fetchCursos(
      this.idNumber,
      0,
      this.currentSort,
      this.currentSearchTerm
    );
  }
}
