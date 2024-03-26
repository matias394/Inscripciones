import moment from 'moment';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild, LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { asistenciaDto } from '@shared/models/asistenciaDto';
import { AsistenciasService } from '@modules/usuario-profesor/asistencias/asistencias.service';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import {
  convertirFecha,
  createDateFromUTCDateString,
  formatDateNgb,
} from '@utils/formatDate';
import { compararFechas } from '@utils/reusableFunctions';

// Registra el idioma español
registerLocaleData(localeEs);

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class AsistenciaComponent {
  form: FormGroup;
  public asistenciaDTO: asistenciaDto;
  public claseId: number;
  public siguiente: any;
  public siguienteId: any;
  public anterior: any;
  public anteriorId: any;
  public dtoData: any;
  public allClassesData: any[] = [];
  public expandContent: boolean = false;
  public selectedId: number = 0;
  public tableData: any;
  public instanciaSedeId: number;

  public tableData2: any;
  public instanciaId: number;
  public usuarioId: number;
  public fechaDeHoy: string;
  public inscripcionId: number;
  public user: any;
  public userIdNumber: number;
  public sedeId: number;
  public asistencia: number = 0;
  public alumnosTableData: Record<string, any> = {};
  public toDate: NgbDate | null = null;
  public isAlert: boolean = false;
  public correct: boolean = false;
  public claseFecha: any;
  public modalSwitch: boolean = false;
  public modalSwitchTwo: boolean = false;
  public modalSwitchThree: boolean = false;
  public listFiltered: any[] = [];
  public error: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalTitleTwo: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';
  public modalMessageTwo: string =
    'Si avanzas sin guardar no se guardarán los datos ingresados';
  public showDatepicker: boolean = false;
  public hayAlMenosUnoCheckeado: boolean = false;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  public windowWidth: number;
  public currentPage: number = 1;
  public modalSwitchPagination: boolean = false;
  public idNumber: number = 0;
  public itemsPerPage: number = 6;
  public allPages: number = 0;
  public model: NgbDateStruct | void;
  public deshabilitarAsistencias: boolean = false;
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private asignarProfesoresService: AsignarProfesoresService,
    private asistenciasService: AsistenciasService,
    private windowDimensionService: WindowDimensionService,
    private tokenStorage: TokenStorageService
  ) {
    this.user = this.tokenStorage.getUser();
    this.userIdNumber = this.user.usuario;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA CLASE
      this.claseId = Number(id);
    });
    this.instanciaId = Number(this.router.url.split('/')[6]);
    this.instanciaSedeId = Number(this.router.url.split('/')[5]);
    this.sedeId = Number(this.router.url.split('/')[3]);
    this.getClase(this.instanciaSedeId, this.claseId);
    this.fetchClasesByInstanciaSede(this.instanciaSedeId);
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  //RETORNA LA CLASE EN PARTICULAR
  getClase(insId: number, clasId: number) {
    this.asignarProfesoresService
      .getClaseAlumnoData(insId, clasId)
      .subscribe((response) => {
        this.tableData = response;
        this.alumnosTableData[clasId] = response.claseAlumnoDTOList;
        this.claseFecha = this.tableData.fecha;
        if (this.claseFecha) {
          this.getFechaClase();
        }
        this.sortByName();
        this.onPageChange();
        this.allPages = Math.ceil(
          this.alumnosTableData[clasId].length / this.itemsPerPage
        );
      });
  }

  todosEstanSeleccionados(): boolean {
    const currentClassStudents = this.alumnosTableData[this.claseId];
    if (currentClassStudents) {
      return currentClassStudents.every((alumno: any) => alumno.asistio);
    }
    return false;
  }

  fetchClasesByInstanciaSede(instanciaSedeId: number) {
    this.asignarProfesoresService
      .getAllClasesByInstanciaSede(instanciaSedeId)
      .subscribe((response) => {
        if (response && response.claseDTO && Array.isArray(response.claseDTO)) {
          response.claseDTO.sort(compararFechas);
          this.dtoData = response.claseDTO;
        }
      });
  }

  //DESABILITA QUE SE PUEDA TOMAR ASISTENCIA EN UNA CLASE QUE NO SE HA REALIZADO
  getFechaClase() {
    const today = moment().format('YYYY-MM-DD');
    const myDate = new Date(createDateFromUTCDateString(this.claseFecha));
    const todayDate = new Date(createDateFromUTCDateString(today));

    if (myDate.getTime() > todayDate.getTime()) {
      this.deshabilitarAsistencias = true;
    } else {
      this.deshabilitarAsistencias = false;
    }
  }

  //EDITAR ASISTENCIA
  editAsistencia(form: any) {
    this.asistenciaDTO = form.value;
    this.asistenciaDTO.claseid = this.claseId;
    this.asistenciaDTO.alumnos = this.alumnosTableData[this.claseId].map(
      (alumno) => {
        return {
          usuarioId: alumno.id,
          asistencia: alumno.asistio ? 1 : 0,
        };
      }
    ) as any;
    this.asistenciasService
      .putAsistencia(this.asistenciaDTO)
      .subscribe((response) => {
        this.correct = true;
        this.hayAlMenosUnoCheckeado = false;
        this.ngOnInit();
      });
  }

  //AGREGA O QUITA ALUMNOS DE MANERA PARTICULAR
  changeCheckbox(event: any, itemId: any) {
    if (event.target.checked) {
      this.hayAlMenosUnoCheckeado = true;
      const updatedClass = this.alumnosTableData[this.claseId].map((el) => {
        if (el.id !== itemId) {
          return el;
        }
        return {
          ...el,
          asistio: true,
          asitencias: el.ausencias === 0 ? 1 : el.asitencias + 1,
          ausencias: el.ausencias === 0 ? 0 : el.ausencias - 1,
        };
      });

      this.alumnosTableData[this.claseId] = updatedClass;
    }

    if (!event.target.checked) {
      this.hayAlMenosUnoCheckeado = true;
      const updatedClass = this.alumnosTableData[this.claseId].map((el) => {
        if (el.id !== itemId) {
          return el;
        }
        return {
          ...el,
          asistio: false,
          asitencias: el.asitencias === 0 ? 0 : el.asitencias - 1,
          ausencias: el.asitencias === 0 ? 1 : el.ausencias + 1,
        };
      });

      this.alumnosTableData[this.claseId] = updatedClass;
    }
  }

  //AGREGA O QUITA TODOS LOS ALUMNOS
  handleAllChecked(event: any) {
    if (event.target.checked) {
      this.hayAlMenosUnoCheckeado = true;
      const updatedClass = this.alumnosTableData[this.claseId].map((el) => {
        return {
          ...el,
          asistio: true,
          asitencias: el.ausencias === 0 ? 1 : el.asitencias + 1,
          ausencias: el.ausencias === 0 ? 0 : el.ausencias - 1,
        };
      });
      const updatedClassMobile = this.listFiltered.map((el) => {
        return {
          ...el,
          asistio: true,
          asitencias: el.ausencias === 0 ? 1 : el.asitencias + 1,
          ausencias: el.ausencias === 0 ? 0 : el.ausencias - 1,
        };
      });

      this.alumnosTableData[this.claseId] = updatedClass;
      this.listFiltered = updatedClassMobile;
    }

    if (!event.target.checked) {
      this.hayAlMenosUnoCheckeado = true;
      const updatedClass = this.alumnosTableData[this.claseId].map((el) => {
        return {
          ...el,
          asistio: false,
          asitencias: el.asitencias === 0 ? 0 : el.asitencias - 1,
          ausencias: el.asitencias === 0 ? 1 : el.ausencias + 1,
        };
      });
      const updatedClassMobile = this.alumnosTableData[this.claseId].map(
        (el) => {
          return {
            ...el,
            asistio: false,
            asitencias: el.asitencias === 0 ? 0 : el.asitencias - 1,
            ausencias: el.asitencias === 0 ? 1 : el.ausencias + 1,
          };
        }
      );

      this.alumnosTableData[this.claseId] = updatedClass;
      this.listFiltered = updatedClassMobile;
    }
  }

  //CAMBIAR DE CLASE
  cambiarDeClaseMas(index: any) {
    if (index < this.dtoData.length - 1) {
      if (this.hayAlMenosUnoCheckeado === true) {
        this.openModalTwo();
        return;
      }
      this.cambiarDeClaseMasHelper(index);
      this.getFechaClase();
    }
  }

  cambiarDeClaseMasHelper(index: any) {
    if (index < this.dtoData?.length - 1) {
      this.siguiente = this.dtoData[index + 1];
      this.siguienteId = this.siguiente.id;

      this.router.navigate([`../${this.siguienteId}`], {
        relativeTo: this.route,
      });
      this.getClase(this.instanciaSedeId, this.siguienteId);
      this.closeModalTwo();
      this.hayAlMenosUnoCheckeado = false;
    }
  }

  cambiarDeClaseMenos(index: any) {
    if (index > 0) {
      if (this.hayAlMenosUnoCheckeado === true) {
        this.openModalThree();
        return;
      }
      this.cambiarDeClaseMenosHelper(index);
      this.getFechaClase();
    }
  }

  cambiarDeClaseMenosHelper(index: any) {
    if (index > 0) {
      this.anterior = this.dtoData[index - 1];
      this.anteriorId = this.anterior.id;
      this.router.navigate([`../${this.anteriorId}`], {
        relativeTo: this.route,
      });
      this.getClase(this.instanciaSedeId, this.anteriorId);
      this.closeModalThree();
      this.hayAlMenosUnoCheckeado = false;
    }
  }

  //HABILITA QUE SE ABRA LA SEGUNDA TABLA
  expandRowContent(id: number) {
    this.expandContent = !this.expandContent;
    this.selectedId = id; //ID DE LA INSCRIPCION
  }

  //PAGINACION MOBILE
  onPageChange(page: number = 1): void {
    this.currentPage = page;
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.listFiltered = this.alumnosTableData[this.claseId].slice(
      startItem,
      endItem
    );
  }

  //DATE PIKER - CAMBIO DE CLASE
  onDateSelection(date: NgbDate) {
    this.dtoData.map((el: any) => {
      if (el.fecha === formatDateNgb(date)) {
        this.router.navigate([`../${el.id}`], {
          relativeTo: this.route,
        });
        this.showDatepicker = false;
        this.getClase(this.instanciaId, el.id);
      } else {
        this.showDatepicker = false;
      }
    });
  }

  openDayPicker(fecha: string) {
    this.showDatepicker = !this.showDatepicker;
    this.fechaDeHoy = fecha;
    this.model = convertirFecha(fecha);
  }

  //CONTROLADOR DE CALENDARIO SELECTOR DE FECHA
  isSelected(date: NgbDate) {
    const today = moment().format('YYYY-MM-DD');
    const myDate = new Date(createDateFromUTCDateString(formatDateNgb(date)));
    const todayDate = new Date(createDateFromUTCDateString(today));

    for (const item of this.dtoData) {
      //SI LA FECHA DE LA CLASE YA PASÓ, RETORNA VERDE
      if (
        item.fecha === formatDateNgb(date) &&
        myDate.getTime() < todayDate.getTime()
      ) {
        return '#23c16b';
      }
      //SI LA FECHA DE LA CLASE TODAVIA NO PASO, RETORNA GRIS
      if (
        item.fecha === formatDateNgb(date) &&
        myDate.getTime() > todayDate.getTime()
      ) {
        return '#C6C6CF';
      }
      // SI LA FECHA DE LA CLASE ES HOY, RETORNA AMARILLO
      if (
        item.fecha === formatDateNgb(date) &&
        myDate.getTime() === todayDate.getTime()
      ) {
        return '#F9E79F';
      }
    }
    return undefined;
  }

  //MODAL
  openModal() {
    this.modalSwitch = true;
  }

  openModalTwo() {
    this.modalSwitchTwo = true;
  }

  openModalThree() {
    this.modalSwitchThree = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  closeModalTwo() {
    this.modalSwitchTwo = false;
  }

  closeModalThree() {
    this.modalSwitchThree = false;
  }

  redirectToPage() {
    this.router.navigate(['../../../../../..'], { relativeTo: this.route });
  }

  //FILTROS

  sortByName() {
    this.alumnosTableData[this.claseId].sort((a: any, b: any) =>
      a.nombreApellido.localeCompare(b.nombreApellido)
    );
    this.listFiltered.sort((a: any, b: any) =>
      a.nombreApellido.localeCompare(b.nombreApellido)
    );
  }

  sortByCuil() {
    this.alumnosTableData[this.claseId].sort((a: any, b: any) =>
      a.cuil.localeCompare(b.cuil)
    );
    this.listFiltered.sort((a: any, b: any) => a.cuil.localeCompare(b.cuil));
  }

  sortByEmail() {
    this.alumnosTableData[this.claseId].sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    this.listFiltered.sort((a, b) => a.email.localeCompare(b.email));
  }

  sortByAsistencias() {
    this.alumnosTableData[this.claseId].sort(
      (a: any, b: any) => b.asitencias - a.asitencias
    );
    this.listFiltered.sort((a: any, b: any) => b.asitencias - a.asitencias);
  }

  sortByAusencias() {
    this.alumnosTableData[this.claseId].sort(
      (a: any, b: any) => b.ausencias - a.ausencias
    );
    this.listFiltered.sort((a: any, b: any) => b.ausencias - a.ausencias);
  }

  sortByPromedio() {
    this.alumnosTableData[this.claseId].sort(
      (a: any, b: any) => b.porcentajeAsistencia - a.porcentajeAsistencia
    );
    this.listFiltered.sort(
      (a: any, b: any) => b.porcentajeAsistencia - a.porcentajeAsistencia
    );
  }

  closeAlert() {
    this.isAlert;
  }
}
