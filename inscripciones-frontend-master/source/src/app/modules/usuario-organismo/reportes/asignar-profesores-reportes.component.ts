import * as moment from 'moment';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { exportToExcel } from '@utils/exportToExcel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '@shared/services/categorias.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { InscripcionesService } from '@modules/inscripciones/inscripciones.service';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';
import { ReportesService } from '@shared/services/reportes.service';
import { reportesDto } from '@shared/models/reportesDto';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asignar-profesores-reportes',
  templateUrl: './asignar-profesores-reportes.component.html',
  styleUrls: ['./asignar-profesores-reportes.component.scss'],
})
export class AsignarProfesoresReportesComponent {
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public allPages: number = 0;
  public idNumber: number = 0;
  public idOrganismo: number = 0;
  public listFiltered: any[] = [];
  public usuarioId: number;
  public isAlert: boolean = false;
  public correct: boolean = false;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  public searchHasBeenTriggered: boolean = false;
  public descargarFormularios: boolean = false;
  public includeRespuestaFormulario: boolean = false;
  public selectedCategoria: any;
  public selectedCategoriaNombre: string = '';
  public selectedInscripcionNombre: string = '';
  public selectedInstanciaNombre: string = '';
  public selectedSedeNombre: string = '';
  public selectedEstadoNombre: string = '';
  public selectedInscripcion: any;
  public selectedInstancia: any;
  public selectedSede: any;
  public selectedEstado: any;
  public inscripcionDisabled = true;
  public instanciaDisabled = true;
  public sedeDisabled = true;
  public estadoDisabled = true;
  public categorias: any[] = [];
  private resizeSub: Subscription;
  public tableData: any[] = [];
  public inscripcion: any[] = [];
  public instancia: any[] = [];
  public sede: any[] = [];
  public estado: any = [
    {
      id: 0,
      nombre: 'Todas',
    },
    {
      id: 1,
      nombre: 'Por Iniciar',
    },
    {
      id: 2,
      nombre: 'Iniciada',
    },
    {
      id: 3,
      nombre: 'Finalizada',
    },
  ];
  private allData: any[] = [];
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public windowWidth: number;
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;

  public fechaReporte: any;
  public formUser = new FormGroup({
    categoria: new FormControl(null, Validators.required),
    inscripcion: new FormControl(null, Validators.required),
    instancia: new FormControl(null, Validators.required),
    sede: new FormControl(null, Validators.required),
    estado: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private inscripcionesService: InscripcionesService,
    private tokenStorage: TokenStorageService,
    private instanciaSedeService: InstanciaSedeService,
    private reportesService: ReportesService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.idOrganismo = this.tokenStorage.getUserData().organismo.id;
    this.usuarioId = this.tokenStorage.getUserData().id;
  }

  ngOnInit(): void {
    this.selectedEstado = 'Todas';
    this.selectedEstadoNombre = 'Todas';
    this.fechaReporte = moment().format('DD-MM-YYYY');
    this.fetchCategoriasByUser();
    this.onToggleSwitchChanged(true);
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.buscarReportes();
  }

  //PRIMER INPUT (CATEGORIA)
  fetchCategoriasByUser() {
    this.categoriasService.getCategoriasUser(this.usuarioId).subscribe(
      (response) => {
        this.categorias = response;
        this.categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //SEGUNDO INPUT (INSCRIPCIONES)
  fetchInscripcionesEnCategorias(selectedCategoria: any) {
    if (selectedCategoria) {
      this.inscripcionesService
        .getInscripcionesPorCategoria(selectedCategoria, this.idOrganismo)
        .subscribe(
          (response) => {
            this.inscripcion = response;
            this.inscripcion.sort((a, b) => a.nombre.localeCompare(b.nombre));
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.formUser.get('inscripcion')?.reset();
    }
  }

  //TERCER INPUT (INSTANCIAS)
  fetchInstanciasEnInscripcion(selectedInscripcion: any) {
    if (selectedInscripcion) {
      this.instanciaSedeService
        .getInstanciasEnInscripcion(selectedInscripcion)
        .subscribe(
          (response) => {
            this.instancia = response;
            this.instancia.sort((a, b) => a.nombre.localeCompare(b.nombre));
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.formUser.get('instancia')?.reset();
    }
  }

  //CUARTO INPUT (SEDES)
  fetchSedesEnInstancia(selectedInstancia: any) {
    if (selectedInstancia) {
      this.instanciaSedeService
        .getSedesEnInstancia(selectedInstancia)
        .subscribe(
          (response) => {
            this.sede = response;
            this.sede.sort((a, b) => a.nombre.localeCompare(b.nombre));
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.formUser.get('sede')?.reset();
    }
  }

  onCategoriaChange() {
    this.selectedCategoria = Number(this.formUser.get('categoria')?.value);
    this.fetchInscripcionesEnCategorias(this.selectedCategoria);
    this.formUser.get('inscripcion').setValue(null);
    this.formUser.get('instancia').setValue(null);
    this.formUser.get('sede').setValue(null);
    this.formUser.get('estado').setValue('');
    this.formUser.get('inscripcion').enable();
    this.formUser.get('instancia').disable();
    this.formUser.get('sede').disable();
    this.formUser.get('estado').disable();
    this.inscripcionDisabled = false;
  }

  onInscripcionChange() {
    this.selectedInscripcion = Number(this.formUser.get('inscripcion')?.value);
    this.fetchInstanciasEnInscripcion(this.selectedInscripcion);
    this.formUser.get('instancia').setValue(null);
    this.formUser.get('sede').setValue(null);
    this.formUser.get('estado').setValue('');
    this.formUser.get('sede').disable();
    this.formUser.get('estado').disable();
    this.formUser.get('instancia').enable();
    this.instanciaDisabled = false;
  }

  onInstanciaChange() {
    this.selectedInstancia = Number(this.formUser.get('instancia')?.value);
    this.fetchSedesEnInstancia(this.selectedInstancia);
    this.formUser.get('sede').setValue(null);
    this.formUser.get('estado').setValue('');
    this.formUser.get('sede').enable();
    this.formUser.get('estado').disable();
    this.sedeDisabled = false;
  }

  onSedeChange() {
    this.selectedSede = Number(this.formUser.get('sede')?.value);
    this.formUser.get('estado').setValue(''); // Restablece el campo de sede
    this.formUser.get('estado').enable();
    this.estadoDisabled = false;
  }

  onEstadoChange() {
    const estadoId = this.formUser.get('estado')?.value;
    this.selectedEstado = Number(estadoId);
  }

  calcularYActualizarDatosNecesarios() {
    this.selectedCategoriaNombre = this.selectedCategoria
      ? this.categorias.find(
          (categoria) => categoria.id === this.selectedCategoria
        )?.nombre || ''
      : '';
    this.selectedInscripcionNombre = this.selectedInscripcion
      ? this.inscripcion.find((insc) => insc.id === this.selectedInscripcion)
          ?.nombre || ''
      : '';
    this.selectedInstanciaNombre = this.selectedInstancia
      ? this.instancia.find((inst) => inst.id === this.selectedInstancia)
          ?.nombre || ''
      : '';
    this.selectedSedeNombre = this.selectedSede
      ? this.sede.find((sed) => sed.id === this.selectedSede)?.nombre || ''
      : '';
    this.selectedEstadoNombre = this.selectedEstado
      ? this.estado.find((es) => es.id === this.selectedEstado)?.nombre ||
        'Todas'
      : 'Todas';
    this.actualizarTablaConDatosCalculados();
  }

  actualizarTablaConDatosCalculados() {
    this.tableData.forEach((item) => {
      item.selectedCategoriaNombre = this.selectedCategoriaNombre;
      item.selectedInscripcionNombre = this.selectedInscripcionNombre;
      item.selectedInstanciaNombre = this.selectedInstanciaNombre;
      item.selectedSedeNombre = this.selectedSedeNombre;
      item.selectedEstadoNombre = this.selectedEstadoNombre;
    });
  }

  refreshWindow() {
    window.location.reload();
  }

  buscarReportes() {
    const categoria = this.formUser.get('categoria')?.value || '';
    const instanciaId = this.formUser.get('instancia')?.value || '';
    const inscripcionId = this.formUser.get('inscripcion')?.value || '';
    const sedeId = this.formUser.get('sede')?.value || '';
    const estado = this.formUser.get('estado')?.value || '';

    const reportesDto: reportesDto = {
      categoria: categoria,
      instanciaId: instanciaId,
      inscripcionId: inscripcionId,
      sedeId: sedeId,
      estado: estado,
    };

    this.reportesService
      .buscarReportesPost(
        this.currentPage - 1,
        this.itemsPerPage,
        'nombre.keyword,asc',
        reportesDto
      )
      .subscribe(
        (response) => {
          this.tableData = response.content;
          this.searchHasBeenTriggered = true;
          this.allPages = response.totalPages;
          this.calcularYActualizarDatosNecesarios();
        },
        (error) => {
          console.log(error);
          this.errorMessage = true;
        }
      );
  }

  bajarReportesSinPaginado() {
    const categoria = this.formUser.get('categoria')?.value || '';
    const instanciaId = this.formUser.get('instancia')?.value || '';
    const inscripcionId = this.formUser.get('inscripcion')?.value || '';
    const sedeId = this.formUser.get('sede')?.value || '';
    const estado = this.formUser.get('estado')?.value || '';

    const reportesDto: reportesDto = {
      categoria: categoria,
      instanciaId: instanciaId,
      inscripcionId: inscripcionId,
      sedeId: sedeId,
      estado: estado,
    };

    this.reportesService.buscarReportesSinPaginado(reportesDto).subscribe(
      (response) => {
        exportToExcel(
          response,
          'reporte.xlsx',
          this.includeRespuestaFormulario,
          this.selectedCategoriaNombre
        );
        this.allData = response.content;
        this.export();
        this.searchHasBeenTriggered = true;
        this.correct = true;
      },
      (error) => {
        console.log(error);
        this.errorMessage = true;
      }
    );
  }

  export() {
    exportToExcel(
      this.allData,
      'reporte.xlsx',
      this.includeRespuestaFormulario,
      this.selectedCategoriaNombre
    );
  }

  onToggleSwitchChanged(value: any) {
    this.includeRespuestaFormulario = value;
  }

  resetForm() {
    this.formUser.get('categoria').enable();
    this.formUser.get('categoria').reset();
    this.formUser.get('inscripcion').disable();
    this.formUser.get('inscripcion').reset();
    this.formUser.get('instancia').disable();
    this.formUser.get('instancia').reset();
    this.formUser.get('sede').disable();
    this.formUser.get('sede').reset();
    this.formUser.get('estado').disable();
    this.formUser.get('estado').reset();
    this.selectedInscripcion = null;
    this.selectedInstancia = null;
    this.selectedSede = null;
    this.selectedEstado = null;
    this.selectedEstadoNombre = 'Todas';
    this.inscripcionDisabled = true;
    this.instanciaDisabled = true;
    this.sedeDisabled = true;
    this.estadoDisabled = true;
  }

  closeAlert() {
    this.isAlert = false;
  }

  redirectToPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
