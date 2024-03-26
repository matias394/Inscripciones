import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResponsiveReportesComponent } from './card-responsive-reportes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardResponsiveReportesComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardResponsiveReportesComponent],
})
export class CardResponsiveReportesModule {}
