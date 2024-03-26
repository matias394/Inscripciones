import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from '../asistencias/asistencia/asistencia.component';
import { AsistenciasComponent } from './asistencias.component';
import { SedeComponent } from '../asistencias/sede/sede.component';
import { InstanciasMobileComponent } from './instancias-mobile/instancias-mobile.component';
import { SedesMobileComponent } from './sedes-mobile/sedes-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasComponent,
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
export class AsistenciasRoutingModule {}