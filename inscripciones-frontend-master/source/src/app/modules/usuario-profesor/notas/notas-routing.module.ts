import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotasComponent } from './notas.component';
import { AsistenciasComponent } from '../asistencias/asistencias.component';
import { SedeComponent } from '../asistencias/sede/sede.component';
import { InstanciasMobileComponent } from '../asistencias/instancias-mobile/instancias-mobile.component';
import { SedesMobileComponent } from '../asistencias/sedes-mobile/sedes-mobile.component';

const routes: Routes = [
  { path: '', component: AsistenciasComponent },
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
    component: NotasComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasRoutingModule {}
