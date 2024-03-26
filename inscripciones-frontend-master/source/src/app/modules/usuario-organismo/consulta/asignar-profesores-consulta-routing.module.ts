import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarProfesoresConsultaComponent } from './asignar-profesores-consulta.component';

const routes: Routes = [
  {
    path: '',
    component: AsignarProfesoresConsultaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarProfesoresConsultaRoutingModule {}
