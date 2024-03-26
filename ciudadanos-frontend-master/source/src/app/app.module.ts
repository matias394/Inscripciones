import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormulariosModule } from '../app/modules/formularios/formularios.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { InscripcionComponent } from './modules/inscripcion/inscripcion.component';
import { AlertasModule } from './components/alertas/alertas.module';
import { ModalsModule } from './components/modals/modals.module';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MibaServices } from './shared/services/miba.service';
import { HeaderService } from './components/header/header.service';
import { WindowDimensionService } from './shared/services/windowDimensionService.service';
import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { CardInscripcionesModule } from './components/card-inscripciones/card-inscripciones.module';
import { HomeService } from './modules/home/home.service';
import { AppConfigService } from './shared/providers/appConfig.service';
import { SpinnerModule } from './components/spinner/spinner.module';
import { InstanciasMobileComponent } from './modules/instancias-mobile/instancias-mobile.component';
import { PaginationModule } from '@components/pagination/pagination.module';

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FormComponent,
    TableComponent,
    BannerComponent,
    InscripcionComponent,
    InstanciasMobileComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AlertasModule,
    ModalsModule,
    NgStepperModule,
    CdkStepperModule,
    BrowserAnimationsModule,
    FormulariosModule,
    CardInscripcionesModule,
    PaginationModule,
    SpinnerModule,
  ],
  providers: [
    MibaServices,
    HeaderService,
    HomeService,
    WINDOW_PROVIDERS,
    WindowDimensionService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
