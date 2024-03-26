import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriaComponent,
  },
  {
    path: 'crear',
    component: CrearCategoriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar',
    component: EditarCategoriaComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaRoutingModule {}
