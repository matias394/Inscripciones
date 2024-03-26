import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInscripcionesComponent } from './card-inscripciones.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardInscripcionesComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [CardInscripcionesComponent],
})
export class CardInscripcionesModule {}
