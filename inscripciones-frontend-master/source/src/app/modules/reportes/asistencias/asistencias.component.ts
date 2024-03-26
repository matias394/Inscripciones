import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss'],
})
export class AsistenciasComponent {
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
      nombre: 'Nombre y apellido del ciudadano 001',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
    },
    {
      id: 2,
      nombre: 'Nombre y apellido del ciudadano 002',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
    },
    {
      id: 3,
      nombre: 'Nombre y apellido del ciudadano 003',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
    },
    {
      id: 4,
      nombre: 'Nombre y apellido del ciudadano 004',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
    },
    {
      id: 5,
      nombre: 'Nombre y apellido del ciudadano 005',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
    },
    {
      id: 6,
      nombre: 'Nombre y apellido del ciudadano 006',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
    },
    {
      id: 7,
      nombre: 'Nombre y apellido del ciudadano 007',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      cursos: 'Curso o Evento 001',
      fecha: 'DD/MM/AA',
      estado: 'Presente',
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
