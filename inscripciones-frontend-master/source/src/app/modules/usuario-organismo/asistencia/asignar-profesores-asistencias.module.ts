import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignarProfesoresAsistenciasComponent } from './asignar-profesores-asistencias.component';
import { AsignarProfesoresAsistenciasRoutingModule } from './asignar-profesores-asistencias-routing.module';
import {
  NgbDatepickerI18n,
  NgbModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalsModule } from '@components/modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { SedeComponent } from './sede/sede.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { InstanciasMobileComponent } from './instancias-mobile/instancias-mobile.component';
import { CustomDatepickerI18n } from '@utils/datepicker-i18n-es';
import { CardResponsiveModule } from '@components/card-responsive-instancias/card-responsive-instancias.module';
import { SedesMobileComponent } from './sedes-mobile/sedes-mobile.component';
import { CardResponsiveSedesModule } from '@components/card-responsive-sedes/card-responsive-sedes.module';
import { QrModule } from '@components/qr-modal/qr-modal.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    AsignarProfesoresAsistenciasComponent,
    SedeComponent,
    AsistenciaComponent,
    InstanciasMobileComponent,
    SedesMobileComponent,
  ],
  imports: [
    CommonModule,
    AsignarProfesoresAsistenciasRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgbTooltip,
    ModalsModule,
    FormsModule,
    AlertasModule,
    PaginationModule,
    CardInscripcionesModule,
    CardResponsiveModule,
    CardResponsiveSedesModule,
    SearchModule,
    NgbModule,
    QrModule,
  ],
  providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  exports: [AsignarProfesoresAsistenciasComponent],
})
export class AsignarProfesoresAsistenciasModule {}
