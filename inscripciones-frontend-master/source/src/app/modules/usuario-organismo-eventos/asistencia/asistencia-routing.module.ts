import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaEventoComponent } from './asistencia-evento/asistencia-evento.component';
import { AsistenciaComponent } from './asistencia.component';
import { SedeComponent } from './sede/sede.component';
import { InstanciasMobileComponent } from './instancias-mobile/instancias-mobile.component';
import { SedesMobileComponent } from './sedes-mobile/sedes-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaComponent,
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
    component: AsistenciaEventoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaRoutingModule {}
