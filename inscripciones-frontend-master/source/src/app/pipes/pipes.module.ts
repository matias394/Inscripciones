import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';
import { SedeNamePipe } from './sedeById.pipe';
import { FormatDateESPipe } from './formatDateES.pipe';
import { TimeShortPipe } from './timeShort.pipe';
import { DayName } from './dayName.pipe';

@NgModule({
  declarations: [FormatDatePipe, FormatDateESPipe, TimeShortPipe, DayName],
  imports: [CommonModule],
  exports: [FormatDatePipe, FormatDateESPipe, TimeShortPipe, DayName],
})
export class PipesModule {}
