import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { findNearestDate } from '@utils/findNearestDate';

@Component({
  selector: 'app-sedes-mobile',
  templateUrl: './sedes-mobile.component.html',
  styleUrls: ['./sedes-mobile.component.scss'],
})
export class SedesMobileComponent {
  public user: any;
  public tableData: any[] = [];
  public cursoData: any;
  public tableData2: any[] = [];
  public nearestClassId: number = 0;
  public nombreCurso: string = 'Nombre del curso';
  public isModalOpen: boolean = false;
  public rolesPerPage: number = 5;
  public allRolesPages: number = 0;
  public userIdNumber: number;
  public currentPage: number = 1;
  public idNumber: number = 0;
  public sedeId: any;
  public instanciaSedeId: number = 0;
  public idInsc: number = 0;
  public windowWidth: number;
  public sedeNombre: string;
  public clasesIds: any;
  public noInstances: any;
  public cursoNombre: any;
  public instancia: any;
  public sedeIdNumber: number;
  public disabledValue: boolean;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private windowDimensionService: WindowDimensionService,
    private asignarProfesoresService: AsignarProfesoresService,
    private router: Router
  ) {
    this.user = this.tokenStorage.getUser();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.instanciaSedeId = Number(id);
      this.idInsc = Number(this.router.url.split('/')[6]);
      this.sedeId = this.router.url.split('/')[3];
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
    this.cursoData = null;
    this.resizeSub.unsubscribe();
  }

  fetchCursosEnSede() {
    this.asignarProfesoresService
      .getInstancias(this.idInsc)
      .subscribe((response) => {
        this.tableData = response;
        this.cursoNombre = response[0].nombreInscripcion;
        this.sortByName();
      });

    this.asignarProfesoresService
      .getClasesByInstanciaSede(this.instanciaSedeId)
      .subscribe((response) => {
        this.tableData2 = response;

        const nearestClass = findNearestDate(this.tableData2);
        if (nearestClass) {
          this.nearestClassId = nearestClass.id;
        }
      });
  }

  showNoInstancesMessage() {
    const instanciaEncontrada = this.tableData.find(
      (item) => item.id === this.sedeIdNumber
    );
    return (
      instanciaEncontrada && instanciaEncontrada.instanciaData.length === 0
    );
  }

  //ORGANIZAR MENU
  sortByName() {
    this.tableData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  sortByFechaInicio() {
    this.tableData.sort(function (a, b) {
      a = a.fechaInicio.split('/').reverse().join('');
      b = b.fechaInicio.split('/').reverse().join('');
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }

  sortByFechaFin() {
    this.tableData.sort(function (a, b) {
      a = a.fechaFin.split('/').reverse().join('');
      b = b.fechaFin.split('/').reverse().join('');
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }

  sortByHora() {
    this.tableData.sort((a, b) => a.horaInicio.localeCompare(b.horario));
  }
}
