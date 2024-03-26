import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ModalsModule } from '@components/modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AsignarProfesoresReportesComponent } from './asignar-profesores-reportes.component';
import { AsignarProfesoresReportesRoutingModule } from './asignar-profesores-reportes-routing.module';
import { SelectInputModule } from '@components/baseInputs/select/select.module';
import { DatePikerModule } from '@components/date-piker/date-piker.module';
import { ToggleSwitchModule } from '@components/toggle-switch/toggle-switch.module';
import { FormulariosComponent } from './formularios/formularios.component';
import { FormulariosModule } from '@modules/formularios/formularios.module';
import { CardResponsiveReportesModule } from '@components/card-responsive-reportes/card-responsive-reportes.module';

@NgModule({
  declarations: [AsignarProfesoresReportesComponent, FormulariosComponent],
  imports: [
    CommonModule,
    AsignarProfesoresReportesRoutingModule,
    NgbModule,
    NgbTooltip,
    ModalsModule,
    FormsModule,
    AlertasModule,
    ReactiveFormsModule,
    PaginationModule,
    SelectInputModule,
    DatePikerModule,
    ToggleSwitchModule,
    FormulariosModule,
    CardResponsiveReportesModule,
  ],
  exports: [AsignarProfesoresReportesComponent],
})
export class AsignarProfesoresReportesModule {}
