import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from '@modules/auth/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });

      if (req.headers.has('Skip-Authorization')) {
        // TODO - REMOVE HOTFIX HEADER AFTER BACKEND FIX
        console.log('skip authorization');
        authReq = req.clone({
          headers: 
          req.headers.delete('Skip-Authorization')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set(TOKEN_HEADER_KEY, 'Bearer ' + token)
        });
      }
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
