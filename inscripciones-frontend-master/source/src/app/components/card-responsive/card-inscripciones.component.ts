import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { ProfesoresService } from '@modules/usuario-profesor/profesores/profesores.service';

@Component({
  selector: 'card-inscripciones',
  templateUrl: './card-inscripciones.component.html',
  styleUrls: ['./card-inscripciones.component.scss'],
})
export class CardInscripcionesComponent implements OnInit {
  @Input() data: any;
  @Input() clases: any;
  @Input() messageButton: string;
  @Input() listaVacia: any;
  @Input() sinResultados: any;
  @Input() currentSearchTerm: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  public user: any;
  public userIdNumber: number = 0;
  public idInstancia: number;
  public sedeIdNumber: number;
  public cursoData: any;
  public instanciaData: any;
  public isModalOpen: boolean = false;
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public expandContentIndex: boolean[] = [false];
  public expandSecondContentIndex: boolean[] = [false];
  public instanciaSedeList = [];
  public clasesData: any;
  public claseId: number;
  public arrayDeFechas: any;

  constructor(
    private profesoresService: ProfesoresService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private asignarService: AsignarProfesoresService
  ) {
    this.user = this.tokenStorage.getUserData();
    this.userIdNumber = this.user.usuario;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA SEDE
      this.sedeIdNumber = id;
    });
  }

  ngOnDestroy() {
    this.cursoData = null;
    this.instanciaData = null;
    this.expandContent = false;
    this.expandSecondContent = false;
    this.selectedId = 0;
    this.selectedIdTwo = null;
  }

  closeModal() {
    this.isModalOpen = false;
    this.ngOnDestroy();
  }

  fetchCursoData(id: number) {
    this.asignarService
      .getDataConsultaCursoInstancia(id)
      .subscribe((response) => {
        this.cursoData = response;
        this.instanciaData = response.instanciaData;
      });
  }
  //FUNCION PARA OBTENER LA CLASE MAS CERCANA
  findNearestDate(claseDTO: any[]) {
    const today = moment();
    let nearestDate: string | null = null;
    let nearestDifference = Number.MAX_SAFE_INTEGER;
    let nearestClassId = 0;

    if (!claseDTO) return null;

    for (const clase of claseDTO) {
      const parsedDate = moment(clase.fecha, 'YYYY-MM-DD');
      const difference = Math.abs(parsedDate.diff(today, 'days'));

      if (difference < nearestDifference) {
        nearestDifference = difference;
        nearestDate = clase.fecha;
        nearestClassId = clase.id;
      }
    }
    return nearestClassId;
  }

  onClickEvent(item) {
    this.onClick.emit(item);
    this.isModalOpen = true;
    this.fetchCursoData(item);
  }

  //HABILITA QUE SE ABRA LA SEGUNDA TABLA
  expandRowContent(instancia: any, index: number) {
    this.asignarService
      .getDataConsultaCursoInstanciaSede(instancia.id)
      .subscribe((response) => {
        this.instanciaSedeList[index] = response;
        this.expandContentIndex[index] = !this.expandContentIndex[index];
        this.selectedId = instancia.id;
      });
  }

  //HABILITA QUE SE ABRA LA TABLA DE SEDES
  expandRowContentTwo(index: number) {
    this.expandSecondContentIndex[index] =
      !this.expandSecondContentIndex[index];
  }
}
