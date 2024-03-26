import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medios',
  templateUrl: './medios.component.html',
  styleUrls: ['./medios.component.scss'],
})
export class MediosComponent {
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
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
    },
    {
      id: 2,
      nombre: 'Nombre y apellido del ciudadano 002',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
    },
    {
      id: 3,
      nombre: 'Nombre y apellido del ciudadano 003',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
    },
    {
      id: 4,
      nombre: 'Nombre y apellido del ciudadano 004',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 001',
      categoria: 'Categoría 1',
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
    },
    {
      id: 5,
      nombre: 'Nombre y apellido del ciudadano 005',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
    },
    {
      id: 6,
      nombre: 'Nombre y apellido del ciudadano 006',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
    },
    {
      id: 7,
      nombre: 'Nombre y apellido del ciudadano 007',
      cuil: '0000000',
      email: 'ejemplo@correo.com',
      organismo: 'Organismo 002',
      categoria: 'Categoría 1',
      evento: 'Evento 001',
      fecha: 'DD/MM/AAAA',
      medio: 'BOTI',
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
