import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { environment } from '@environments/environment';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseURLInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
      const token = this.token.getToken();
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':
          'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      });
      const url = `${environment.mibaURL}${req.url}`.replace(
        /([^:]\/)\/+/g,
        '$1'
      );
      req = req.clone({ url, headers });
    }
    return next.handle(req);
  }
}

export const baseInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
];
