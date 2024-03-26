import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarProfesoresReportesComponent } from './asignar-profesores-reportes.component';
import { FormulariosComponent } from '@modules/usuario-organismo/reportes/formularios/formularios.component';
const routes: Routes = [
  {
    path: '',
    component: AsignarProfesoresReportesComponent,
  },
  {
    path: 'formularios/:id/:id',
    component: FormulariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarProfesoresReportesRoutingModule {}
