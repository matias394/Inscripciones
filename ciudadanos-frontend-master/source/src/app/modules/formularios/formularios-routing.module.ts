import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PrevisualizacionComponent } from './previsualizacion/previsualizacion.component';
// import { PrevisualizandoFormularioComponent } from './formularios/componentes/previsualizando-formulario/previsualizando-formulario.component';

const routes: Routes = [
  // { path: 'prueba1', component: PrevisualizandoFormularioComponent },
  // {
  //   path: 'prueba2',
  //   component: PrevisualizacionComponent,
  //   pathMatch: 'full',
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioRoutingModule {}
