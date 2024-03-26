import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { FormsModule } from '@angular/forms';
import { ProfesoresComponent } from './profesores.component';
import { PaginationModule } from '@components/pagination/pagination.module';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { PipesModule } from '@pipes/pipes.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [ProfesoresComponent],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ModalsModule,
    AlertasModule,
    FormsModule,
    PaginationModule,
    CardInscripcionesModule,
    PipesModule,
    SearchModule,
  ],
  exports: [ProfesoresComponent],
})
export class ProfesoresModule {}
