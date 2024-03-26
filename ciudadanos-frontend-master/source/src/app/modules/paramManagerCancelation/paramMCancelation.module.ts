import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamMCancelationRoutingComponent } from './paramMCancelation-routing.module';
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { ParamMCancelationComponent } from './paramMCancelation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ParamMCancelationComponent],
  imports: [CommonModule, FormsModule, ParamMCancelationRoutingComponent],
  exports: [],
  providers: [authInterceptorProviders]
})
export class ParamMCancelationModule {}
