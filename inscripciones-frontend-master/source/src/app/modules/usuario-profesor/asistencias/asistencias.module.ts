import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AsistenciasComponent } from './asistencias.component';
import { SedeComponent } from './sede/sede.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import {
  NgbDatepickerI18n,
  NgbModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { InstanciasMobileComponent } from './instancias-mobile/instancias-mobile.component';
import { CardInscripcionesModule } from '@components/card-responsive/card-inscripciones.module';

import { registerLocaleData } from '@angular/common';
import { CustomDatepickerI18n } from '@utils/datepicker-i18n-es';
import localeEs from '@angular/common/locales/es';
import { CardResponsiveProfesorModule } from '@components/card-responsive-profesor/card-responsive-profesor.module';
import { SedesMobileComponent } from './sedes-mobile/sedes-mobile.component';
import { CardResponsiveSedesModule } from '@components/card-responsive-sedes/card-responsive-sedes.module';
import { QrModule } from '@components/qr-modal/qr-modal.module';
import { SearchModule } from '@components/search/search.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AsistenciasComponent,
    SedeComponent,
    AsistenciaComponent,
    InstanciasMobileComponent,
    SedesMobileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertasModule,
    ModalsModule,
    PaginationModule,
    AsistenciasRoutingModule,
    NgbTooltip,
    NgbModule,
    CardInscripcionesModule,
    CardResponsiveProfesorModule,
    CardResponsiveSedesModule,
    SearchModule,
    QrModule,
  ],
  providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class AsistenciasModule {}
