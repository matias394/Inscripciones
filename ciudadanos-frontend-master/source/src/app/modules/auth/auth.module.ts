import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.service';
import { authInterceptorProviders } from '@helpers/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [FormsModule, CommonModule, AuthRoutingModule, HttpClientModule],
  providers: [authInterceptorProviders],
})
export class AuthModule {}
