import { Subject, Subscription } from 'rxjs';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { SpinnerService } from '@components/spinner/spinner.service';

@Component({
  selector: 'app-instancias-mobile',
  templateUrl: './instancias-mobile.component.html',
  styleUrls: ['./instancias-mobile.component.scss'],
})
export class InstanciasMobileComponent {
  public listFiltered: any;
  public user: any;
  public originalData: any[] = [];
  public tableData: any[] = [];
  public cursoData: any;
  public nombreCurso: string = 'Nombre del curso';
  public isModalOpen: boolean = false;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number = 0;
  public sedeId: number = 0;
  public idInsc: number = 0;
  public windowWidth: number;
  public image: string = './assets/img/banner-two.png';
  public description: string;
  public clasesIds: any;
  public noInstances: any;
  public instanciaNombre: any;
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
    private router: Router,
    private instanciaSedeService: InstanciaSedeService,
    private tokenService: TokenStorageService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.idInsc = Number(this.router.url.split('/')[6]);
    this.sedeId = Number(this.router.url.split('/')[3]);
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.sedeIdNumber = Number(id);
      console.log(this.sedeIdNumber);
    });
    this.fetchCursos();
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

  fetchCursos() {
    this.spinnerService.show();
    if (this.tokenService.getJwtToken === null) {
      var token = this.tokenService.getToken();
    } else {
      var token = this.tokenService.getJwtToken();
    }
    /* Consulta a instancia */
    this.instanciaSedeService
      .getInstanciaSedeById(this.sedeIdNumber, token)
      .subscribe((response) => {
        this.originalData = response;
        console.log(this.originalData);
        this.instanciaNombre = response[0].instancia.nombre;
        this.description = response[0].instancia.inscripcion.nombre;
        this.onPageChange();
        this.allPages = Math.ceil(this.originalData.length / this.itemsPerPage);
        this.spinnerService.hide();
      });
  }

  onPageChange(page: number = 1): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.listFiltered = this.originalData
      .slice(startIndex, endIndex)
      .map((item, index) => ({ ...item, index: startIndex + index }));
  }
}
