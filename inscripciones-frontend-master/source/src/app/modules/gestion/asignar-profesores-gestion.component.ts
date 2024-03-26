import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscritoService } from '@shared/services/inscritos.service';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-asignar-profesores-gestion',
  templateUrl: './asignar-profesores-gestion.component.html',
  styleUrls: ['./asignar-profesores-gestion.component.scss'],
})
export class AsignarProfesoresGestionComponent {
  public confirm = false;
  public error = false;
  public errorDatos = false;
  public isAlert = false;
  public errorUserNotExisting = false;
  public errorCuilData = false;
  public selectedRow: any;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public allPages: number = 0;
  public listFiltered: any[] = [];
  currentSearchTerm: string = '';
  private currentFilters: any = {};
  @ViewChild('formUser', { static: false }) formUser: NgForm;

  constructor(
    private router: Router,
    private inscritoService: InscritoService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {}

  fetchInscriptos(resetPage: boolean = false) {
    const { nombre, apellido, documento } = this.formUser.value;
    const size = this.itemsPerPage;
    const sort = 'nombre';
    this.currentFilters = { nombre, apellido, documento };

    if (resetPage) {
      this.currentPage = 1;
    }

    const page = this.currentPage - 1;

    this.inscritoService
      .getInscriptions(
        page,
        size,
        sort,
        nombre || '',
        apellido || '',
        documento || ''
      )
      .subscribe((response) => {
        this.listFiltered = response.content;
        this.allPages = response.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const { nombre, apellido, documento } = this.currentFilters;
    this.fetchInscriptos();
  }

  selectRow(row: any) {
    this.selectedRow = row;
  }

  limpiarCampos() {
    this.formUser.resetForm();
    this.currentFilters = { nombre: '', apellido: '', documento: '' };
  }

  closeAlert() {
    this.isAlert = false;
  }

  createInscription() {
    this.router.navigate(['crear/inscripcion'], {
      relativeTo: this.route,
    });
  }

  verInscripciones(user: any) {
    this.tokenService.saveUserManagement(user);
    this.router.navigate(['ver/', user?.cuil], {
      relativeTo: this.route,
    });
  }

  hasValue(form: NgForm): boolean {
    const { nombre, apellido, documento } = form.value;
    return nombre || apellido || documento;
  }
}
