import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-card-responsive-sedes',
  templateUrl: './card-responsive-sedes.component.html',
  styleUrls: ['./card-responsive-sedes.component.scss'],
})
export class CardResponsiveSedesComponent {
  @Input() data: any;
  @Input() dataTwo: any;
  @Input() clases: any;
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
  public clasesData: any;
  public claseId: number;
  public arrayDeFechas: any;

  constructor(
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService
  ) {
    this.user = this.tokenStorage.getUserData();
    this.userIdNumber = this.user.usuario;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA SEDE
      this.sedeIdNumber = Number(id);
    });
  }

  onClickEvent(item) {
    this.onClick.emit(item);
    this.isModalOpen = true;
  }

  //HABILITA QUE SE ABRA LA SEGUNDA TABLA
  expandRowContent(id: number) {
    this.expandContent = !this.expandContent;
    this.selectedId = id; //ID DE LA INSTANCIA
  }

  //HABILITA QUE SE ABRA LA TABLA DE SEDES
  expandRowContentTwo(id: number) {
    this.expandSecondContent = !this.expandSecondContent;
    this.selectedIdTwo = id; //ID DE LA INSCRIPCION
  }
}
