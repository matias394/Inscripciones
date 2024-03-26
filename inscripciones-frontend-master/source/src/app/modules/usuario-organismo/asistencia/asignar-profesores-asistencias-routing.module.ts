import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarProfesoresAsistenciasComponent } from './asignar-profesores-asistencias.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { SedeComponent } from './sede/sede.component';
import { InstanciasMobileComponent } from './instancias-mobile/instancias-mobile.component';
import { SedesMobileComponent } from './sedes-mobile/sedes-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: AsignarProfesoresAsistenciasComponent,
  },
  {
    path: 'sede/:id',
    component: SedeComponent,
  },
  {
    path: 'sede/:id/asistencia/mob/:id',
    component: InstanciasMobileComponent,
  },
  {
    path: 'sede/:id/asistencia/mob/:id/:id',
    component: SedesMobileComponent,
  },
  {
    path: 'sede/:id/asistencia/:id/:id/:id',
    component: AsistenciaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarProfesoresAsistenciasRoutingModule {}
