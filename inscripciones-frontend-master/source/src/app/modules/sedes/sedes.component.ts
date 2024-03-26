import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { sedesDto } from '@shared/models/sedesDto';
import { SedesService } from '@shared/services/sedes.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss'],
})
export class SedesComponent implements OnInit {
  public sedes!: sedesDto;
  public tableData: any[] = [];
  public modalTitle: string = '¿Desea eliminar la sede?';
  public modalTitleDelete: string = 'Información';
  public modalMessageDelete: string =
    'Existen usuarios o inscripciones vigentes asociados a esta sede';
  public modalMessage: string =
    'Si eliminas esta Sede no podremos recuperar sus datos';
  public modalSwitch: boolean = false;
  public modalDelete: boolean = false;
  public sedesPerPage: number = 5;
  public allSedesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sedeService: SedesService
  ) {}

  ngOnInit() {
    this.fetchSedes(0, '');
  }

  openModal(id: number) {
    this.modalSwitch = true;
    this.idNumber = id;
  }

  openNotDelete() {
    this.modalDelete = true;
  }

  backToFirst() {
    this.currentPage = 1;
  }

  deleteSedesById(id: number) {
    this.closeModal();
    this.sedeService.deleteSedeById(id).subscribe((response) => {
      if (response) {
        this.ngOnInit();
        this.backToFirst();
      } else {
        this.openNotDelete();
      }
    });
  }

  closeModal() {
    this.modalSwitch = false;
  }

  closeDeleteModal() {
    this.modalDelete = false;
  }

  fetchSedes(page: number, searchTerm: string) {
    this.sedeService
      .getSedes(page, this.sedesPerPage, searchTerm)
      .subscribe((response) => {
        this.tableData = response.content;
        this.allSedesPages = response.totalPages;
      });
  }

  onSedesPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.fetchSedes(startPage, this.currentSearchTerm);
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.fetchSedes(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.fetchSedes(0, searchTerm);
    this.currentPage = 1;
  }

  goEdit(id: number) {
    this.router.navigate(['editar'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
