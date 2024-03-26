import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AsistenciasComponent } from './asistencias.component';
import { PaginationModule } from '@components/pagination/pagination.module';
import { DatePikerModule } from '@components/date-piker/date-piker.module';
import { TextInputModule } from '@components/baseInputs/text-input/text-input.module';
import { ToggleSwitchModule } from '@components/toggle-switch/toggle-switch.module';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { SelectInputModule } from '@components/baseInputs/select/select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';

@NgModule({
  declarations: [AsistenciasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule,
    DatePikerModule,
    TextInputModule,
    ToggleSwitchModule,
    SelectSearchModule,
    SelectInputModule,
    FormsModule,
    HttpClientModule,
    ModalsModule,
    AlertasModule,
  ],
  exports: [AsistenciasComponent],
})
export class AsistenciasModule {}
