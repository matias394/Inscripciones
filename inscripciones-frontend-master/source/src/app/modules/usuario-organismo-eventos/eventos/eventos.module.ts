import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosComponent } from './eventos.component';
import { EventosRoutingModule } from './eventos-routing.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ModalsModule } from '@components/modals/modals.module';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { PipesModule } from '@pipes/pipes.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [EventosComponent],
  imports: [
    CommonModule,
    EventosRoutingModule,
    PaginationModule,
    ModalsModule,
    CardInscripcionesModule,
    PipesModule,
    FormsModule,
    SearchModule,
  ],
  exports: [EventosComponent],
})
export class EventosModule {}
