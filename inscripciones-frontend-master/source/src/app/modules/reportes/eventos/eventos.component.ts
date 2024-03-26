import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent {
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
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      estado: 'Presente',
      sede: 'Sede 001',
      modalidad: 'Presencial',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
    },
    {
      id: 2,
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      sede: 'Sede 001',
      estado: 'Presente',
      modalidad: 'Presencial',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
    },
    {
      id: 3,
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      sede: 'Sede 001',
      estado: 'Presente',
      modalidad: 'Presencial',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
    },
    {
      id: 4,
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      sede: 'Sede 001',
      estado: 'Presente',
      modalidad: 'Presencial',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
    },
    {
      id: 5,
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      sede: 'Sede 001',
      estado: 'Presente',
      modalidad: 'Virtual',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
    },
    {
      id: 6,
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      sede: 'Sede 001',
      estado: 'Presente',
      modalidad: 'Virtual',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
    },
    {
      id: 7,
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      instancia: '001',
      fechaInicio: 'DD/MM/AA',
      fechaFin: 'DD/MM/AA',
      cursos: 'Curso 001',
      sede: 'Sede 001',
      estado: 'Presente',
      modalidad: 'Virtual',
      cuposDisponibles: '10',
      cuposTomados: '10',
      cuposCreados: '10',
      profesor: 'Profesor asignado 1',
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
