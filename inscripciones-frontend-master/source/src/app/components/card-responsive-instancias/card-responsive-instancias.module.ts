import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { PipesModule } from '@pipes/pipes.module';
import { CardResponsiveInstanciasComponent } from './card-responsive-instancias.component';

@NgModule({
  declarations: [CardResponsiveInstanciasComponent],
  imports: [CommonModule, RouterModule, PaginationModule, PipesModule],
  exports: [CardResponsiveInstanciasComponent],
})
export class CardResponsiveModule {}
