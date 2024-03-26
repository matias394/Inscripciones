import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { ErrorInputModule } from '../../error-input/error-input.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorInputModule],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
