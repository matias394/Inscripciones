import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '@components/pagination/pagination.module';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ModalsModule,
    AlertasModule,
    FormsModule,
    PaginationModule,
  ],
  exports: [CursosComponent],
})
export class CursosModule {}
