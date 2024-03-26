import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profesores-asignados',
  templateUrl: './profesores-asignados.component.html',
  styleUrls: ['./profesores-asignados.component.scss'],
})
export class ProfesoresAsignadosComponent {
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public idNumber: number = 0;
  public listFiltered: any[] = [];
  public modalTitle: string =
    '¿Deseas volver a la pantalla de Reportes disponibles?';
  public modalMessage: string = 'Si cancelas no podremos recuperar los datos';
  public modalSwitch: boolean = false;
  public isAlert: boolean = false;
  public correct: boolean = false;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  public tableData: any[] = [
    {
      id: 1,
      nombre: 'Nombre y apellido del profesor 001',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
    {
      id: 2,
      nombre: 'Nombre y apellido del profesor 002',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
    {
      id: 3,
      nombre: 'Nombre y apellido del profesor 003',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
    {
      id: 4,
      nombre: 'Nombre y apellido del profesor 004',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
    {
      id: 5,
      nombre: 'Nombre y apellido del profesor 005',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
    {
      id: 6,
      nombre: 'Nombre y apellido del profesor 006',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
    {
      id: 7,
      nombre: 'Nombre y apellido del profesor 007',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      curso: 'Curso 001',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onPageChange(page: number = 1): void {
    this.currentPage = page;
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.listFiltered = this.tableData.slice(startItem, endItem);
  }

  closeAlert() {
    this.isAlert = false;
  }

  openModal() {
    this.modalSwitch = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  redirectToPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
