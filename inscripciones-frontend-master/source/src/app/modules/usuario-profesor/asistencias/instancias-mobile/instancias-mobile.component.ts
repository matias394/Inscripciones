import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsistenciasService } from '@modules/usuario-profesor/asistencias/asistencias.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';

@Component({
  selector: 'app-instancias-mobile',
  templateUrl: './instancias-mobile.component.html',
  styleUrls: ['./instancias-mobile.component.scss'],
})
export class InstanciasMobileComponent {
  public user: any;
  public tableData: any[] = [];
  public tableData2: any[] = [];
  public tableData3: any;
  public cursoData: any;
  public nombreCurso: string = 'Nombre del curso';
  public isModalOpen: boolean = false;
  public rolesPerPage: number = 5;
  public allRolesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number = 0;
  public idInsc: number = 0;
  public windowWidth: number;
  public cursoNombre: any;
  public sedeIdNumber: number;
  public disabledValue: boolean;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private windowDimensionService: WindowDimensionService,
    private tokenStorage: TokenStorageService,
    private asistenciasService: AsistenciasService,
    private instanciaSedeService: InstanciaSedeService,
    private router: Router
  ) {
    this.user = this.tokenStorage.getUser();
    this.idNumber = this.user.usuario;
  }

  ngOnInit() {
    this.idInsc = Number(this.router.url.split('/')[6]);
    this.sedeIdNumber = Number(this.router.url.split('/')[3]);
    this.fetchCursosPorSede(this.idInsc, this.sedeIdNumber);
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

  showNoInstancesMessage() {
    const instanciaEncontrada = this.tableData.find(
      (item) => item.id === this.sedeIdNumber
    );
    return (
      instanciaEncontrada && instanciaEncontrada.instanciaData.length === 0
    );
  }

  //SERVICES

  // fetchCursosPorSede(sedeId: any, usuarioId: any) {
  //   this.asistenciasService
  //     .getCursosPorSede(sedeId, usuarioId)
  //     .subscribe((response) => {
  //       this.tableData = response;
  //       response?.map((item) => {
  //         if (item.id === this.idInsc) {
  //           this.cursoNombre = item.nombre;
  //         }
  //       });
  //     });
  // }

  fetchCursosPorSede(inscripcionId: number, sedeId: number) {
    this.instanciaSedeService
      .getInstanciasByInscriptionAndSede(inscripcionId, sedeId)
      .subscribe((response) => {
        this.tableData = response;
        this.cursoNombre = response[0].nombreInscripcion;
        this.sortByName();
      });
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
