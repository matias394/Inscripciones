import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInscripcionesComponent } from './card-inscripciones.component';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [CardInscripcionesComponent],
  imports: [CommonModule, RouterModule, PaginationModule, PipesModule],
  exports: [CardInscripcionesComponent],
})
export class CardInscripcionesModule {}
