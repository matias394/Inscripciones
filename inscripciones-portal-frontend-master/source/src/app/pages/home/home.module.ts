import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.module';
import { CategoriesModule } from './categories/categories.module';
import { ButtonLoadMoreModule } from 'src/app/components/button-load-more/button-load-more.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HomeRoutingModule,
    CustomIconModule,
    CategoriesModule,
    ButtonLoadMoreModule,
    SpinnerModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
