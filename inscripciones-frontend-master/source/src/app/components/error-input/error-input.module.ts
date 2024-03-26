import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInputComponent } from './error-input.component';
import { ErrorType } from '@pipes/errorType';

@NgModule({
  declarations: [ErrorInputComponent, ErrorType],
  imports: [CommonModule],
  exports: [ErrorInputComponent],
})
export class ErrorInputModule {}
