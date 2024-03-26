import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inscripcionesDto } from '@shared/models/inscripcionesDto';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  public inscripciones!: inscripcionesDto;
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar la inscripción?';
  public modalMessage: string =
    'Si eliminas esta inscripción no podremos recuperar sus datos';
  public modalSwitch: boolean = false;
  public inscripcionesPerPage: number = 10;
  public allInscripcionesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.fetchInscripciones(0, '');
  }

  //SERVICIOS INSCRIPCIONES
  fetchInscripciones(page: number, searchTerm: string) {
    this.sharedService
      .getInscripciones(page, this.inscripcionesPerPage, 'id,desc', searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allInscripcionesPages = response.totalPages;
      });
  }

  onInscripcionesPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchInscripciones(startPage, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchInscripciones(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchInscripciones(0, searchTerm);
    this.currentPage = 1;
  }

  fetchInscripcionById(id: number) {
    this.sharedService.getInscripcion(id).subscribe((response) => {});
  }

  updateInscripcion(id: number, inscripcion: inscripcionesDto) {
    this.sharedService
      .putInscripcion(id, inscripcion)
      .subscribe((response) => {});
  }

  deleteInscripcionById(id: number) {
    this.sharedService.deleteInscripcion(id).subscribe((response) => {
      this.ngOnInit();
      this.backToFirst();
    });
    this.closeModal();
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  backToFirst() {
    this.currentPage = 1;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  goEdit(id: number) {
    this.router.navigate([`editar/${id}`], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
