import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstanciasMobileRoutingModule } from './instancias-mobile-routing.module';
import { authInterceptorProviders } from '@helpers/auth.interceptor';
import { CardInscripcionesModule } from '@components/card-inscripciones/card-inscripciones.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InstanciasMobileRoutingModule,
    RouterModule,
    CardInscripcionesModule,
  ],
  exports: [],
  providers: [authInterceptorProviders],
})
export class InstanciasMobileModule {}
