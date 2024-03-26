import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent {
  public tableData = [
    {
      id: 1,
      title: 'Alumnos inscriptos',
    },
    {
      id: 2,
      title: 'Asistencia',
    },
    {
      id: 3,
      title: 'Cursos / Eventos asignados',
    },
    {
      id: 4,
      title: 'Medios de asignación',
    },
    {
      id: 5,
      title: 'Profesores asignados',
    },
    {
      id: 6,
      title: 'Usuarios',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
