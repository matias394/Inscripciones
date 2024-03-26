import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResponsiveProfesorComponent } from './card-responsive-profesor.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardResponsiveProfesorComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardResponsiveProfesorComponent],
})
export class CardResponsiveProfesorModule {}
