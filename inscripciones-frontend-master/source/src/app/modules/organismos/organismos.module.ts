import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrganismosComponent } from './organismos.component';
import { CrearOrganismosComponent } from './crear-organismos/crear-organismos.component';
import { EditarOrganismosComponent } from './editar-organismos/editar-organismos.component';
import { OrganismosRoutingModule } from './organismos-routing.module';
import { ModalsModule } from '@components/modals/modals.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    OrganismosComponent,
    CrearOrganismosComponent,
    EditarOrganismosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    OrganismosRoutingModule,
    PaginationModule,
    ModalsModule,
    AlertasModule,
    SearchModule,
  ],
})
export class OrganismosModule {}
