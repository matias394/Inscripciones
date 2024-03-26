import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { PipesModule } from '@pipes/pipes.module';
import { CardResponsiveAsignarComponent } from './card-responsive-asignar.component';

@NgModule({
  declarations: [CardResponsiveAsignarComponent],
  imports: [CommonModule, RouterModule, PaginationModule, PipesModule],
  exports: [CardResponsiveAsignarComponent],
})
export class CardResponsiveAsignarModule {}
