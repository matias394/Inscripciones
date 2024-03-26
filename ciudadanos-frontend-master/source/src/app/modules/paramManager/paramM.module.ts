import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamMRoutingComponent } from './paramM-routing.module';
import { authInterceptorProviders } from '@helpers/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, ParamMRoutingComponent],
  exports: [],
  providers: [authInterceptorProviders],
})
export class ParamMModule {}
