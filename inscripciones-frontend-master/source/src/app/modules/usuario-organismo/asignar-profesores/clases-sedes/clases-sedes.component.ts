import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Subscription } from 'rxjs';

interface Horario {
  dias: string;
  horas: Array<string>;
}

@Component({
  selector: 'app-clases-sedes',
  templateUrl: './clases-sedes.component.html',
  styleUrls: ['./clases-sedes.component.scss'],
})
export class ClasesSedesComponent {
  private dataUser: any;
  public idUsuario: number;
  public idOrganismo: number;
  @Input() listaVacia: any;
  public idInstancia: number;
  public idInstanciaSede: number;
  public instanciaNombre: string;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public windowWidth: number;
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public sedes: Array<any> = [];

  constructor(
    private instanciaSede: InstanciaSedeService,
    private route: ActivatedRoute,
    private windowDimensionService: WindowDimensionService
  ) {
    this.idOrganismo = this.dataUser?.organismo?.id;
    this.idUsuario = this.dataUser?.id;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA INSCRIPCION
      this.idInstancia = Number(id);
    });
    this.getAllSedesEnInstancia(0);
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  getAllSedesEnInstancia(page: number) {
    this.instanciaSede
      .getInstanciasEnInstanciaSede(this.idInstancia, page, this.itemsPerPage)
      .subscribe((response) => {
        const data = response.content;
        data.forEach((element, indexData) => {
          const horario: Array<Horario> = [];
          element.fechaDiasList.forEach((fecha) => {
            let index = horario.findIndex((horas) => horas.dias === fecha.dias);
            if (index > -1) {
              horario[index].horas.push(fecha.horario);
            } else {
              horario.push({
                dias: fecha.dias,
                horas: [fecha.horario],
              });
            }
          });
          data[indexData].fechaDiasList = horario;
        });
        // console.log(data);
        this.sedes = data;
        this.allPages = response.totalPages;
        this.instanciaNombre = response.content[0].instanciaNombre;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    const startPage = page - 1;

    this.instanciaSede
      .getInstanciasEnInstanciaSede(
        this.idInstancia,
        startPage,
        this.itemsPerPage
      )
      .subscribe((response) => {
        this.sedes = response.content;
      });
  }
}
