import { Subject, Subscription } from 'rxjs';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
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
  public dataUser: any = {};
  public userIdNumber: number;
  public organismoTipoId: number;
  public sedeId: number;
  public expandContent: boolean = false;
  public selectedId: number = 0;
  public tableData: any[] = [];
  public expandSecondContent: boolean = false;
  public expandThirdContent: any;
  public expandInstancyContent: boolean[] = [false];
  public expandedState: { [fecha: string]: boolean } = {};
  public selectedInstancyThree: any = 0;
  public selectedIdTwo: any = 0;
  public selectedIdThree: any = 0;
  public selectedDate: any;
  public sedeNombre: string = '';
  public windowWidth: number;
  public instanciasList: [];
  public fechaClasesList: [];
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  //CONSTRUCTOR AND ONINIT

  constructor(
    private asignarProfesoresService: AsignarProfesoresService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService,
    private instanciaSedeService: InstanciaSedeService,
    private claseService: ClaseService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
    this.userIdNumber = this.dataUser.id;
    this.organismoTipoId = this.dataUser.organismo.id;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA SEDE
      this.sedeId = id;
    });
    this.fetchCursosEnSede();
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

  getInstanciasByInscripcion(id: number) {
    this.instanciaSedeService
      .getInstanciasByInscriptionAndSede(id, this.sedeId)
      .subscribe((data) => {
        this.instanciasList = data;
      });
  }

  getClasesByInstanciaSede(instanciaSedeId: number) {
    this.claseService
      .getInstanciaSedeById(instanciaSedeId)
      .subscribe((data) => {
        this.fechaClasesList = data;
      });
  }

  //CURSOS EN SEDE
  fetchCursosEnSede() {
    const organismoId = this.dataUser.organismo.id;
    const userId = this.dataUser.id;
    this.asignarProfesoresService
      .getCursosPorSede(organismoId, 1, this.sedeId, userId)
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
    this.getInstanciasByInscripcion(id);

    if (!this.expandContent) {
      this.expandRowContentTwo(0);
      this.expandInstancyContent.fill(false);
      this.expandedState = {};
    }
  }

  expandRowContentTwo(id: number) {
    this.expandSecondContent = !this.expandSecondContent;
    this.selectedIdTwo = id;

    if (!this.expandSecondContent) {
      this.expandInstancyContent.fill(false);
    }
  }

  expandRowContentInstancy(id: number, index: number) {
    this.expandInstancyContent[index] = !this.expandInstancyContent[index];
    this.selectedInstancyThree = id;
    this.getClasesByInstanciaSede(id);
  }

  expandRowContentDate(fecha: any, index: number) {
    this.expandedState[index] = !this.expandedState[index];
    this.selectedDate = fecha;
  }

  //ORGANIZAR MENU
  sortByName() {
    this.tableData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
}
