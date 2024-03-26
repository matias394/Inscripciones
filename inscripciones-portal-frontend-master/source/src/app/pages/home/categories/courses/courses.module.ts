import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.module';
import { ButtonLoadMoreModule } from 'src/app/components/button-load-more/button-load-more.module';
import { ModalColonyModule } from 'src/app/components/modal-colony/modal-colony.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    RouterModule,
    CustomIconModule,
    ButtonLoadMoreModule,
    ModalColonyModule,
    SpinnerModule,
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}
