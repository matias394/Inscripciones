import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '@modules/usuario-profesor/profesores/profesores.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
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
  public cursoData: any;
  public nombreCurso: string = 'Nombre del curso';
  public isModalOpen: boolean = false;
  public rolesPerPage: number = 5;
  public allRolesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number = 0;
  public sedeId: number = 0;
  public idInsc: number = 0;
  public windowWidth: number;
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
    private route: ActivatedRoute,
    private windowDimensionService: WindowDimensionService,
    private tokenStorage: TokenStorageService,
    private instanciaSedeService: InstanciaSedeService,
    private router: Router
  ) {
    this.user = this.tokenStorage.getUserData();
    this.idNumber = this.user.usuario;
  }

  ngOnInit() {
    this.idInsc = Number(this.router.url.split('/')[6]);
    this.sedeId = Number(this.router.url.split('/')[3]);
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.sedeIdNumber = Number(id);
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
    this.instanciaSedeService
      .getInstanciasByInscriptionAndSede(this.idInsc, this.sedeId)
      .subscribe((response) => {
        this.tableData = response;
        this.cursoNombre = response[0].nombreInscripcion;
        this.sortByName();
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
