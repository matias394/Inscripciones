import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInputModule } from '../../error-input/error-input.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorInputModule],
  exports: [SelectComponent],
})
export class SelectInputModule {}
