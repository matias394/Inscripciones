import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { authInterceptorProviders } from '@helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AppConfigService } from '@providers/app-config.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    RecaptchaV3Module,
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useFactory: (appConfigService: AppConfigService) =>
        appConfigService.getConfig().recaptchaKey,
      deps: [AppConfigService],
    },
  ],
})
export class AuthModule {}
