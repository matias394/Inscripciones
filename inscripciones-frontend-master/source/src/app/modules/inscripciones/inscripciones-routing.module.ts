import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { InscripcionesComponent } from './inscripciones.component';

const routes: Routes = [
  {
    path: '',
    component: InscripcionesComponent,
  },
  {
    path: 'crear',
    component: FormComponent,
  },
  {
    path: 'editar/:id',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
