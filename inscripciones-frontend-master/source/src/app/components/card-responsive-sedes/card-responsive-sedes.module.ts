import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResponsiveSedesComponent } from './card-responsive-sedes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardResponsiveSedesComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardResponsiveSedesComponent],
})
export class CardResponsiveSedesModule {}
