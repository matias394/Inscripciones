import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadanosInscriptosComponent } from './ciudadanos-inscriptos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectInputModule } from '@components/baseInputs/select/select.module';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { ToggleSwitchModule } from '@components/toggle-switch/toggle-switch.module';
import { TextInputModule } from '@components/baseInputs/text-input/text-input.module';
import { ModalsModule } from '@components/modals/modals.module';
import { DatePikerModule } from '@components/date-piker/date-piker.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AlertasModule } from '@components/alertas/alertas.module';

@NgModule({
  declarations: [CiudadanosInscriptosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SelectInputModule,
    SelectSearchModule,
    ToggleSwitchModule,
    TextInputModule,
    ModalsModule,
    DatePikerModule,
    PaginationModule,
    AlertasModule,
  ],
  exports: [CiudadanosInscriptosComponent],
})
export class CiudadanosInscriptosModule {}
