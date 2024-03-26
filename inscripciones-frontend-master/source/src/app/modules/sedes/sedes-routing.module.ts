import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SedesComponent } from './sedes.component';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { EditarSedeComponent } from './editar-sede/editar-sede.component';

const routes: Routes = [
  {
    path: '',
    component: SedesComponent,
  },
  {
    path: 'crear',
    component: CrearSedeComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar',
    component: EditarSedeComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SedesRoutingModule {}
