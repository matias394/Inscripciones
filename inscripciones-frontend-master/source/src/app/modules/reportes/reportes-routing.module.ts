import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { CiudadanosInscriptosComponent } from './ciudadanos-inscriptos/ciudadanos-inscriptos.component';
import { MediosComponent } from './medios/medios.component';
import { EventosComponent } from './eventos/eventos.component';
import { ReportesComponent } from './reportes.component';
import { ProfesoresAsignadosComponent } from './profesores-asignados/profesores-asignados.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
  },
  {
    path: 'reportes-alumnos-inscriptos',
    component: CiudadanosInscriptosComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes-asistencias',
    component: AsistenciasComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes-cursos-eventos',
    component: EventosComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes-medios',
    component: MediosComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes-profesores-asignados',
    component: ProfesoresAsignadosComponent,
    pathMatch: 'full',
  },
  {
    path: 'reportes-usuarios',
    component: UsuariosComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
