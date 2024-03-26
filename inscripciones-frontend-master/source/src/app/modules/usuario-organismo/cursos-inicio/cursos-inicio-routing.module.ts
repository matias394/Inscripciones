import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosInicioComponent } from './cursos-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: CursosInicioComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosInicioRoutingModule {}
