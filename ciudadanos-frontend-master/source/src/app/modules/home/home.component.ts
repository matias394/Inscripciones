import { Subject, Subscription, Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { FormulariosService } from '@shared/services/formularios.service';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Instancia } from '@shared/models/instancias';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';
import { PaginationService } from '@shared/services/pagination.service';
import { HomeService } from './home.service';
import { orderHours } from '@utils/orderFunctions';
import { SpinnerService } from '@components/spinner/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listFiltered: Array<Instancia> = [];
  public originalData: any[] = [];
  public startIndex: number = 0;
  public tableData: any[] = [];
  public bodyData: any[] = [];
  public cantidadCuposUsuario: number = 0;
  public cantidadCuposInscripcion: number = 0;
  public inscrito: boolean = false;
  public idNumber: number = 0;
  public isLoading = false;
  public itemsPerPage: number = 5;
  public horarios: any[] = [];
  public allPages: number = 0;
  public currentPage: number = 1;
  public image: string = './assets/img/banner-two.png';
  public description: string;
  public message: string;
  public windowWidth: number;
  public disabledValue: boolean;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject<Instancia>();
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;

  headData = [
    { Head: 'Nombre', Fieldname: 'nombre' },
    { Head: 'Sede', Fieldname: 'sede' },
    { Head: 'Fecha de inicio', Fieldname: 'fechaInicio' },
    { Head: 'Días, hora desde, hora hasta', Fieldname: 'diaHoraDesdeHasta' },
    { Head: 'Modalidad', Fieldname: 'modalidad' },
    { Head: 'Acción', Fieldname: '' },
  ];

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private formularioService: FormulariosService,
    private windowDimensionService: WindowDimensionService,
    private homeService: HomeService,
    private instanciaSedeService: InstanciaSedeService,
    private paginationService: PaginationService,
    private spinnerService: SpinnerService
  ) {
    this.paginationService.searchEvent$.subscribe((searchTerm) => {
      this.currentPage = 1;
      this.currentSearchTerm = searchTerm;
      this.getInscripciones(0, searchTerm);
    });
  }

  ngOnInit(): void {
    this.spinnerService.isLoading$.subscribe((isLoading) => {
      console.log('isLoading:', isLoading);
      this.isLoading = isLoading;
      console.log('isLoading:', isLoading);
    });
    this.description = this.tokenService.getTitleInscription();
    this.homeService.change.subscribe((name) => {
      this.description = name;
    });
    this.getInscripciones(0, '');
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
          this.image = './assets/img/banner-responsive.jpeg';
        } else {
          this.image = './assets/img/banner-two.png';
        }
      }
    );
  }

  ngOnDestroy() {
    this.resizeSub.unsubscribe();
    this.btnClickInscribite$.unsubscribe();
  }

  goToPage() {
    this.router.navigate(['inscripcion', this.bodyData.map((x) => x.id)]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getInscripciones(startPage, this.currentSearchTerm);
  }

  getInscripciones(page: number, busqueda: string) {
    const codeInscription = Number(this.tokenService.getCodeInscription());
    if (this.tokenService.getJwtToken === null) {
      var token = this.tokenService.getToken();
    } else {
      var token = this.tokenService.getJwtToken();
    }
    this.instanciaSedeService
      .getInstanciaSedeByBusqueda(
        codeInscription,
        page,
        this.itemsPerPage,
        busqueda,
        token
      )
      .subscribe((response) => {
        this.originalData = response.content;
        this.originalData.forEach((row) => {
          const uniqueDays = new Set<string>();
          const horariosAgrupados = {};

          row.horarios = row.horarios.sort((a, b) => {
            return orderHours(a.horario) - orderHours(b.horario);
          });

          row.horarios.forEach((horario) => {
            uniqueDays.add(horario.dias);

            if (!horariosAgrupados[horario.dias]) {
              horariosAgrupados[horario.dias] = [];
            }

            horariosAgrupados[horario.dias].push(horario.horario);
          });

          row.horarios = Array.from(uniqueDays).map((dias) => ({
            dias: dias
              .split(' - ')
              .map((dia) => dia.substring(0, 3))
              .join(', '),
            horario: horariosAgrupados[dias]
              .sort((a, b) => {
                return orderHours(a) - orderHours(b);
              })
              .join('\n'),
            horarioFormateado: horariosAgrupados[dias]
              .sort((a, b) => orderHours(a) - orderHours(b))
              .map((timeSlot) => timeSlot.replace('a', '-'))
              .join(', '),
          }));
        });

        this.listFiltered = this.originalData;
        this.allPages = response.totalPages;

        this.listFiltered = this.originalData;
        this.allPages = response.totalPages;
      });
  }

  /* Usuario */
  valueValidator(cantidadCupos: any, idInstancia: any): Observable<boolean> {
    return new Observable((observer) => {
      const user = this.tokenService.getUserInformation();
      const token = this.tokenService.getJwtToken();
      this.formularioService
        .getResultsByCuilMibaAndIdInstancia(user.cuil, idInstancia, token)
        .subscribe(
          (response) => {
            if (response.length === cantidadCupos) {
              this.tokenService.saveDisabledInstancy('true');
              this.inscrito = true;
              this.message =
                'No se puede inscribir porque ha utilizado todos sus cupos';
              observer.next(true);
            } else {
              this.tokenService.saveDisabledInstancy('false');
              observer.next(false);
            }
          },
          (error) => {
            console.log(error);
            observer.next(false);
          }
        );
    });
  }

  counterInstancia(idInstancia: any, cantidadCupos: any) {
    if (this.tokenService.getJwtToken === null) {
      var token = this.tokenService.getToken();
    } else {
      var token = this.tokenService.getJwtToken();
    }
    this.formularioService
      .getCounterByInstancianId(idInstancia, token)
      .subscribe(
        (response) => {
          if (response === cantidadCupos) {
            this.tokenService.saveDisabledInstancy('true');
          } else {
            this.tokenService.saveDisabledInstancy('false');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
