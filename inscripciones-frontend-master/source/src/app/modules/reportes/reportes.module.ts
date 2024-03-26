import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ReportesComponent } from './reportes.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { CiudadanosInscriptosComponent } from './ciudadanos-inscriptos/ciudadanos-inscriptos.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { EventosComponent } from './eventos/eventos.component';
import { MediosComponent } from './medios/medios.component';
import { ProfesoresAsignadosComponent } from './profesores-asignados/profesores-asignados.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePikerModule } from '@components/date-piker/date-piker.module';
import { TextInputModule } from '@components/baseInputs/text-input/text-input.module';
import { ToggleSwitchModule } from '@components/toggle-switch/toggle-switch.module';
import { SelectInputModule } from '@components/baseInputs/select/select.module';
import { SelectSearchModule } from '@components/select-search/select-search.module';

@NgModule({
  declarations: [
    ReportesComponent,
    CiudadanosInscriptosComponent,
    AsistenciasComponent,
    EventosComponent,
    MediosComponent,
    ProfesoresAsignadosComponent,
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    ModalsModule,
    AlertasModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    HttpClientModule,
    PaginationModule,
    DatePikerModule,
    TextInputModule,
    ToggleSwitchModule,
    SelectInputModule,
    SelectSearchModule,
  ],
  exports: [ReportesComponent],
})
export class ReportesModule {}
