import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '@components/pagination/pagination.module';
import { DatePikerModule } from '@components/date-piker/date-piker.module';
import { TextInputModule } from '@components/baseInputs/text-input/text-input.module';
import { ToggleSwitchModule } from '@components/toggle-switch/toggle-switch.module';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { SelectInputModule } from '@components/baseInputs/select/select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { EventosComponent } from './eventos.component';

@NgModule({
  declarations: [EventosComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PaginationModule,
    DatePikerModule,
    TextInputModule,
    ToggleSwitchModule,
    SelectSearchModule,
    SelectInputModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    AlertasModule,
  ],
  exports: [EventosComponent],
})
export class EventosModule {}
