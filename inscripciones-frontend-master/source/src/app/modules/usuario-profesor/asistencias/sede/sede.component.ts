import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciasService } from '@modules/usuario-profesor/asistencias/asistencias.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { ordenarClasesPorFecha } from '@utils/formatDate';
import { findSedeNombre } from '@utils/reusableFunctions';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';
import { ClaseService } from '@shared/services/clase.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss'],
})
export class SedeComponent {
  public user: any = {};
  public userIdNumber: number = 0;
  public sedeIdNumber: number = 0;
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: number = 0;
  public tableData: any[] = [];
  public expandInstancyContent: boolean[] = [false];
  public expandedState: { [fecha: string]: boolean } = {};
  public selectedInstancyThree: number = 0;
  public usuarioId: number = 0;
  public sedeId: number = 0;
  public inscripcionId: number = 0;
  public sedeNombre: string = '';
  public selectedDate: any;
  public windowWidth: number;
  public instanciasList: [];
  public fechaClasesList: [];
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private asistenciasService: AsistenciasService,
    private windowDimensionService: WindowDimensionService,
    private tokenStorage: TokenStorageService,
    private instanciaSedeService: InstanciaSedeService,
    private claseService: ClaseService
  ) {
    this.user = this.tokenStorage.getUser();
    this.userIdNumber = this.user.usuario;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA SEDE
      this.sedeIdNumber = id;
    });
    this.fetchCursosPorSede(this.sedeIdNumber, this.userIdNumber);
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

  //SERVICES
  fetchCursosPorSede(sedeId: any, usuarioId: any) {
    this.asistenciasService
      .getCursosPorSede(sedeId, usuarioId)
      .subscribe((response) => {
        this.tableData = response;
        this.sortByName();
        this.tableData.map((item) => {
          item.instanciaData.sort((a, b) => a.id - b.id);
          return item;
        });

        this.tableData.forEach((curso) => {
          curso.instanciaData.forEach((instancia) => {
            instancia.instanciaSedeDataDTO.forEach((clase) => {
              ordenarClasesPorFecha(clase.fechaClases);
            });
          });
        });

        this.sedeNombre = findSedeNombre(this.tableData);
      });
  }

  //CHANGE EXPAND CONTENT
  expandRowContent(id: number) {
    this.expandContent = !this.expandContent;
    this.selectedId = id; //ID DE LA INSCRIPCION

    if (!this.expandContent) {
      this.expandRowContentTwo(0);
      this.expandInstancyContent.fill(false);
      this.expandedState = {};
    }
  }

  expandRowContentTwo(id: number) {
    this.expandSecondContent = !this.expandSecondContent;
    this.selectedIdTwo = id; //ID DE LA INSTANCIA

    if (!this.expandSecondContent) {
      this.expandInstancyContent.fill(false);
    }
  }

  expandRowContentInstancy(id: number, index: number) {
    this.expandInstancyContent[index] = !this.expandInstancyContent[index];
    this.selectedInstancyThree = id;

    if (!this.expandInstancyContent[index]) {
      this.expandInstancyContent.fill(false);
    }
  }

  expandRowContentDate(fecha: any, index: number) {
    this.expandedState[index] = !this.expandedState[index];
    this.selectedDate = fecha;
  }

  //ORGANIZAR MENU
  sortByName() {
    this.tableData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  getInstanciasByInscripcion(id: number){
    this.instanciaSedeService.getInstanciasByInscriptionAndSede(id, this.sedeIdNumber).subscribe((data) =>{
      this.instanciasList = data;
    })
}

  getClasesByInstanciaSede(instanciaSedeId: number){
    this.claseService.getInstanciaSedeById(instanciaSedeId).subscribe((data) =>{
      this.fechaClasesList = data;
    })
  }
}
