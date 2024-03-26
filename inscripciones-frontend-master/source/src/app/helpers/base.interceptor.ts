import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TokenStorageService } from '../modules/auth/token-storage.service';
import { SpinnerService } from '../components/spinner/spinner.service';
import { finalize } from 'rxjs';
import { AppConfigService } from '../providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseURLInterceptor implements HttpInterceptor {
  private regex = '/refresh';
  constructor(
    private token: TokenStorageService,
    private readonly spinnerService: SpinnerService,
    private configService: AppConfigService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.match(this.regex)) {
      this.spinnerService.show();
    }

    var regexAsset = /assets[^&]+/;

    if (!req.url.match(/^http(s)?:\/\/(.*)$/) && !req.url.match(regexAsset)) {
      const token = this.token.getToken();
      const headers = new HttpHeaders({
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'X-Frame-Options': 'DENY',
        'Access-Control-Allow-Headers':
          'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      });
      const url = `${this.configService.getConfig().baseUrl}${req.url}`.replace(
        /([^:]\/)\/+/g,
        '$1'
      );
      req = req.clone({ url, headers });
    }

    return next.handle(req).pipe(finalize(() => this.spinnerService.hide()));
  }
}

export const baseInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
];
