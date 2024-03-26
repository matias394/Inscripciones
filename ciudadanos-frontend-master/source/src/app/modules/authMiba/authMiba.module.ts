import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMibaRoutingComponent } from './authMiba-routing.module';
import { authInterceptorProviders } from '@helpers/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthMibaRoutingComponent],
  exports: [],
  providers: [authInterceptorProviders],
})
export class AuthMibaModule {}
