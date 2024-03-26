import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.module';
import { ButtonLoadMoreModule } from 'src/app/components/button-load-more/button-load-more.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule,
    CustomIconModule,
    ButtonLoadMoreModule,
    CategoriesRoutingModule,
    SpinnerModule,
  ],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
