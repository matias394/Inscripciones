import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedesComponent } from './sedes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { SedesRoutingModule } from './sedes-routing.module';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { EditarSedeComponent } from './editar-sede/editar-sede.component';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [SedesComponent, CrearSedeComponent, EditarSedeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PaginationModule,
    ModalsModule,
    AlertasModule,
    SedesRoutingModule,
    SelectSearchModule,
    SearchModule,
  ],
})
export class SedesModule {}
