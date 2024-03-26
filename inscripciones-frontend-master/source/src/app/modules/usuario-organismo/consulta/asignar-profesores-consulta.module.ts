import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ModalsModule } from '@components/modals/modals.module';
import { FormsModule } from '@angular/forms';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AsignarProfesoresConsultaComponent } from './asignar-profesores-consulta.component';
import { AsignarProfesoresConsultaRoutingModule } from './asignar-profesores-consulta-routing.module';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { PipesModule } from '@pipes/pipes.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [AsignarProfesoresConsultaComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbTooltip,
    ModalsModule,
    AsignarProfesoresConsultaRoutingModule,
    FormsModule,
    AlertasModule,
    PaginationModule,
    CardInscripcionesModule,
    SearchModule,
    PipesModule,
  ],
  exports: [AsignarProfesoresConsultaComponent],
})
export class AsignarProfesoresConsultaModule {}
