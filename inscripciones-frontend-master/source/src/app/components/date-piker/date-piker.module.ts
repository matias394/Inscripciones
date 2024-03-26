import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePikerComponent } from './date-piker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInputModule } from '../error-input/error-input.module';

@NgModule({
  declarations: [DatePikerComponent],
  imports: [CommonModule, NgbModule, ReactiveFormsModule, ErrorInputModule],
  exports: [DatePikerComponent],
})
export class DatePikerModule {}
