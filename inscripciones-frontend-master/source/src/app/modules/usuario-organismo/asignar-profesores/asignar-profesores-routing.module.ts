import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarProfesoresComponent } from './asignar-profesores.component';
import { ClaseComponent } from './clase/clase.component';
import { ClasesComponent } from './clases/clases.component';
import { InstanciasComponent } from './instancias/instancias.component';
import { ClasesSedesComponent } from './clases-sedes/clases-sedes.component';

const routes: Routes = [
  {
    path: '',
    component: AsignarProfesoresComponent,
  },
  {
    path: 'inscripcion/:id',
    component: InstanciasComponent,
  },
  {
    path: 'inscripcion/:id/sedes/:id',
    component: ClasesSedesComponent,
  },
  {
    path: 'inscripcion/:id/sedes/:id/clases/:id',
    component: ClasesComponent,
  },
  {
    path: 'inscripcion/:id/sedes/:id/clases/:id/clase/:id',
    component: ClaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarProfesoresRoutingModule {}
