import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionRoutingModule } from './inscripcion-routing.module';
import { ModalsModule } from '@components/modals/modals.module';
import { authInterceptorProviders } from '@helpers/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, InscripcionRoutingModule, ModalsModule, FormsModule],
  providers: [authInterceptorProviders],
})
export class InscripcionModule {}
