import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RoutingModule } from './app-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { HeaderComponent } from './components/app-header/app-header.component';
import { FooterComponent } from './components/app-footer/app-footer.component';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import {
  CommonModule,
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { baseInterceptorProviders } from './helpers/base.interceptor';
import { errorInterceptorProviders } from './helpers/error.interceptor';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { SpinnerModule } from './components/spinner/spinner.module';
import { TagInputModule } from 'ngx-chips';
import { AppConfigService } from './providers/app-config.service';
import { ErrorHttpModule } from './components/error-http/error-http.module';
import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { WindowDimensionService } from './shared/services/windowDimensionService.service';
import localeEs from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { FormulariosModule } from './modules/formularios/formularios.module';
import { ModalsModule } from './components/modals/modals.module';

registerLocaleData(localeEs);

export function initConfig(appConfig: AppConfigService) {
  // const { recaptchaKey } = appConfig.loadConfig();
  return () => appConfig.loadConfig();
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavSidebarComponent,
    NavItemComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormlyBootstrapModule,
    SpinnerModule,
    FormlyModule.forRoot(),
    TagInputModule,
    ErrorHttpModule,
    FormulariosModule,
    ModalsModule,
  ],
  providers: [
    authInterceptorProviders,
    baseInterceptorProviders,
    errorInterceptorProviders,
    WINDOW_PROVIDERS,
    WindowDimensionService,
    DatePipe,
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-AR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
