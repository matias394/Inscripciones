import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { sortByCategoria, sortByName } from '@utils/sorting-utils';

@Component({
  selector: 'app-eventos-inicio',
  templateUrl: './eventos-inicio.component.html',
  styleUrls: ['./eventos-inicio.component.scss'],
})
export class EventosInicioComponent {
  private dataUser: any;
  public user: any;
  public idOrganismo: any;
  public idNumber: number = 0;
  public cursoData: any;
  public idInsc: number = 0;
  public listaInscripciones: any[] = [];
  public instanciaData: any;
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public isModalOpen: boolean = false;
  public windowWidth: number;
  public expandContentIndex: boolean[] = [false];
  public expandSecondContentIndex: boolean[] = [false];
  public instanciaSedeList = [];
  public disabledValue: boolean;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private asignarService: AsignarProfesoresService,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
    this.idOrganismo = this.dataUser?.organismo?.id;
  }

  ngOnInit(): void {
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

  closeModal() {
    this.isModalOpen = false;
    this.ngOnDestroy();
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

  getLast(page: number): void {
    const usuarioId = this.tokenStorage.getUserData().id;
    this.asignarService
      .getListaInscripciones(
        this.idOrganismo,
        2,
        usuarioId,
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

  openModal(id: number) {
    this.isModalOpen = true;
    this.idInsc = id;
    this.fetchCursoData(this.idInsc);
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
    this.listaInscripciones.sort(sortByName);
  }

  sortByCategory() {
    this.listaInscripciones.sort(sortByCategoria);
  }
}
