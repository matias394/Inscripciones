import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosInicioComponent } from './eventos-inicio.component';
import { EventosInicioRoutingModule } from './eventos-inicio-routing.module';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [EventosInicioComponent],
  imports: [
    CommonModule,
    EventosInicioRoutingModule,
    CardInscripcionesModule,
    PipesModule,
  ],
  exports: [EventosInicioComponent],
})
export class EventosInicioModule {}
