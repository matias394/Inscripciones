import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { sortByCategoria, sortByName } from '@utils/sorting-utils';

@Component({
  selector: 'app-cursos-inicio',
  templateUrl: './cursos-inicio.component.html',
  styleUrls: ['./cursos-inicio.component.scss'],
})
export class CursosInicioComponent {
  private dataUser: any;
  public user: any;
  public idOrganismo: any;
  public idNumber: number = 0;
  public cursoData: any;
  public instanciaData: any;
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public idInsc: number = 0;
  public listaInscripciones: any[] = [];
  public isModalOpen: boolean = false;
  public windowWidth: number;
  public disabledValue: boolean;
  private resizeSub: Subscription;
  public expandContentIndex: boolean[] = [false];
  public expandSecondContentIndex: boolean[] = [false];
  public instanciaSedeList = [];
  public maxWidthMobile = MAX_WIDTH_MOBILE;
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
    private asignarService: AsignarProfesoresService,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
  }

  ngOnInit(): void {
    this.getOrganismoId();
    if (this.idOrganismo) {
      this.getLast(0);
    }
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

  getOrganismoId() {
    this.idOrganismo = this.dataUser?.organismo?.id;
  }

  getLast(page: number): void {
    const userId = this.dataUser?.id;
    this.asignarService
      .getListaInscripciones(
        this.idOrganismo,
        1,
        userId,
        page,
        5,
        'id,desc',
        ''
      )
      .subscribe((response) => {
        this.listaInscripciones = response.content;
      });
  }

  fetchCursoData(id: number) {
    this.asignarService
      .getDataConsultaCursoInstancia(id)
      .subscribe((response) => {
        this.cursoData = response;
        this.instanciaData = response.instanciaData;
      });
  }

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
    this.listaInscripciones.sort(sortByName);
  }

  sortByCategory() {
    this.listaInscripciones.sort(sortByCategoria);
  }
}
