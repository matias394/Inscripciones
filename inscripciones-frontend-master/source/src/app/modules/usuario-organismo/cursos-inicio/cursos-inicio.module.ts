import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosInicioRoutingModule } from './cursos-inicio-routing.module';
import { CursosInicioComponent } from './cursos-inicio.component';
import { ModalsModule } from '@components/modals/modals.module';
import { FormsModule } from '@angular/forms';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [CursosInicioComponent],
  imports: [
    CommonModule,
    CursosInicioRoutingModule,
    ModalsModule,
    FormsModule,
    CardInscripcionesModule,
    PipesModule,
  ],
  exports: [CursosInicioComponent],
})
export class CursosInicioModule {}
