import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { ErrorHTTPService } from '../components/error-http/error-http.service';
import { Router } from '@angular/router';
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly errorService: ErrorHTTPService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          if (error.status === 401) {
            this.authService.autoLogout();
          }
        }

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        return next.handle(req).pipe(
          finalize(() => {
            this.errorService.showAlert(error.status, 5000);
          })
        );
        // return throwError(errorMessage);
      })
    );
  }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
