import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { authInterceptorProviders } from '@helpers/auth.interceptor';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, RouterModule, FormsModule],
  exports: [],
  providers: [authInterceptorProviders, DatePipe],
})
export class HomeModule {}
