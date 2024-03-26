import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';
import { ErrorInputModule } from '../../error-input/error-input.module';

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorInputModule],
  exports: [TextInputComponent],
})
export class TextInputModule {}
