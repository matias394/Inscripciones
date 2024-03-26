import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from './select-search.component';
import { ErrorInputModule } from '../error-input/error-input.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectSearchComponent],
  imports: [CommonModule, ErrorInputModule, ReactiveFormsModule],
  exports: [SelectSearchComponent],
})
export class SelectSearchModule {}
