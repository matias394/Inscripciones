import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscritoService } from '@shared/services/inscritos.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-ver-inscripcion',
  templateUrl: './ver-inscripcion.component.html',
  styleUrls: ['./ver-inscripcion.component.scss'],
})
export class VerInscripcionComponent {
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar la inscripción?';
  public modalTitleDelete: string = 'Información';
  public modalMessageDelete: string =
    'Existen usuarios o inscripciones vigentes asociados a esta sede';
  public modalMessage: string =
    'Si eliminas esta inscripción el ciudadano desaparecerá de las listas de asistencia';
  public modalSwitch: boolean = false;
  public modalDelete: boolean = false;
  public inscripcionesPerPage: number = 5;
  public allInscripcionesPages: number = 0;
  public currentPage: number = 1;
  public mongoID: string;
  public filteredData: any[] = [];
  public selectedRow: any;
  public usuario: any;
  public name: string;
  public lastname: string;
  public currentSort: string = 'id,desc';
  currentSearchTerm: string = '';

  searchTerm$ = new Subject<string>();
  listFiltered: any[] = [];
  cuilParam: any;

  constructor(
    private route: ActivatedRoute,
    private inscritoService: InscritoService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit() {
    this.usuario = this.tokenService.getUserManagement();
    this.cuilParam = this.usuario.cuil;
    this.name = this.usuario.nombre;
    this.lastname = this.usuario.apellido;
    this.loadInscripciones(0, 'id,desc', '');
  }

  loadInscripciones(page: number, sort: string, searchTerm: string) {
    this.inscritoService
      .getInscriptionsByCuil(this.cuilParam, page, 5, sort, searchTerm)
      .subscribe((response) => {
        this.listFiltered = response.content;
        this.allInscripcionesPages = response.totalPages;
      });
  }

  onInscripcionesPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.loadInscripciones(startPage, this.currentSort, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.loadInscripciones(0, 'id,desc', searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.loadInscripciones(0, 'id,desc', searchTerm);
    this.currentPage = 1;
  }

  selectRow(row: any) {
    this.selectedRow = row;
  }

  openModal(id: string) {
    this.modalSwitch = true;
    this.mongoID = id;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  sortByName() {
    this.currentSort = 'nombre';
    this.loadInscripciones(0, this.currentSort, this.currentSearchTerm);
  }

  sortByCategoria() {
    this.currentSort = 'organismoCategoria.categoria.nombre,asc';
    this.loadInscripciones(0, this.currentSort, this.currentSearchTerm);
  }

  deleteInscripcionById(mongoID: string) {
    this.inscritoService
      .cancelInscripcionByCuilAndInstanciaID(mongoID)
      .subscribe(
        (response) => {
          // this.listFiltered = response;

          this.closeModal();
          this.loadInscripciones(
            this.cuilParam,
            'id,desc',
            this.currentSearchTerm
          );
        },
        (error) => {
          console.log(error);
          this.closeModal();
        }
      );
  }
}
