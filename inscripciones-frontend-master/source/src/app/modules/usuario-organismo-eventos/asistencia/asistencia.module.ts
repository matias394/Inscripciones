import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AsistenciaComponent } from './asistencia.component';
import { SedeComponent } from './sede/sede.component';
import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { AsistenciaEventoComponent } from './asistencia-evento/asistencia-evento.component';
import { ModalsModule } from '@components/modals/modals.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import {
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';
import { InstanciasMobileComponent } from './instancias-mobile/instancias-mobile.component';
import { CardResponsiveModule } from '@components/card-responsive-instancias/card-responsive-instancias.module';
import { CustomDatepickerI18n } from '@utils/datepicker-i18n-es';
import { SedesMobileComponent } from './sedes-mobile/sedes-mobile.component';
import { CardResponsiveSedesModule } from '@components/card-responsive-sedes/card-responsive-sedes.module';
import { QrModule } from '@components/qr-modal/qr-modal.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    AsistenciaComponent,
    SedeComponent,
    AsistenciaEventoComponent,
    InstanciasMobileComponent,
    SedesMobileComponent,
  ],
  imports: [
    CommonModule,
    AsistenciaRoutingModule,
    ModalsModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    AlertasModule,
    NgbDatepickerModule,
    NgbTooltip,
    RouterModule,
    NgbModule,
    CardInscripcionesModule,
    CardResponsiveModule,
    CardResponsiveSedesModule,
    SearchModule,
    QrModule,
  ],
  providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  exports: [AsistenciaComponent],
})
export class AsistenciaModule {}
