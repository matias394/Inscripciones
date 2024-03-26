import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimePikerComponent } from './time-piker.component';

@NgModule({
  declarations: [TimePikerComponent],
  imports: [CommonModule, NgbModule],
  exports: [TimePikerComponent],
})
export class TimePikerModule {}
