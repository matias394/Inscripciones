import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { EditarRolesComponent } from './editar-roles/editar-roles.component';
import { CrearRolesComponent } from './crear-roles/crear-roles.component';

const routes: Routes = [
{ 
  path: '', 
  component: RolesComponent 
},
{
  path: 'crear',
  component: CrearRolesComponent,
  pathMatch: 'full',
},
{
  path: 'editar',
  component: EditarRolesComponent,
  pathMatch: 'full',
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
