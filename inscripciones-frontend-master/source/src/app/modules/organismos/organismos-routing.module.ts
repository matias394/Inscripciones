import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearOrganismosComponent } from './crear-organismos/crear-organismos.component';
import { EditarOrganismosComponent } from './editar-organismos/editar-organismos.component';
import { OrganismosComponent } from './organismos.component';

const routes: Routes = [
  { path: '', component: OrganismosComponent },
  {
    path: 'crear',
    component: CrearOrganismosComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar',
    component: EditarOrganismosComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganismosRoutingModule {}
