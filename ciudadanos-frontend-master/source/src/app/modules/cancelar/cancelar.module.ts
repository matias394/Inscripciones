import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelarRoutingModule } from './cancelar-routing.module';
import { authInterceptorProviders } from '@helpers/auth.interceptor';
import { CancelarComponent } from './cancelar.component';
import { FormsModule } from '@angular/forms';
import { AlertasModule } from '@components/alertas/alertas.module';

@NgModule({
  declarations: [CancelarComponent],
  imports: [CommonModule, CancelarRoutingModule, FormsModule, AlertasModule],
  providers: [authInterceptorProviders],
})
export class CancelarModule {}
