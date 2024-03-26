import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciasRoutingModule } from '../../asistencias/asistencias-routing.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AlertasModule,
    PaginationModule,
    AsistenciasRoutingModule,
  ],
})
export class AsistenciaModule {}
