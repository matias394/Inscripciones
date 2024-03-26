import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { CrearRolesComponent } from './crear-roles/crear-roles.component';
import { EditarRolesComponent } from './editar-roles/editar-roles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RolesComponent } from './roles.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';

@NgModule({
  declarations: [RolesComponent, CrearRolesComponent, EditarRolesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    HttpClientModule,
    FormsModule,
    PaginationModule,
    ModalsModule,
    AlertasModule,
  ],
})
export class RolesModule {}
