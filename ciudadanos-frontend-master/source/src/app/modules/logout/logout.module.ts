import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authInterceptorProviders } from '@helpers/auth.interceptor';
import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LogoutRoutingModule],
  exports: [],
  providers: [authInterceptorProviders],
})
export class LogoutModule {}
