import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
// import { SpinnerService } from '../components/spinner/spinner.service';
import { finalize } from 'rxjs';
import { AppConfigService } from '../app/services/app-config.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NO_API_KEY } from 'src/app/shared/http.context';

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
      this.spinnerService.showLoader();
    }

    var regexAsset = /assets[^&]+/;
    if (!req.url.match(/^http(s)?:\/\/(.*)$/) && !req.url.match(regexAsset)) {
      const token = this.token.getJwtToken();
      const headers = new HttpHeaders({
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'X-Frame-Options': 'DENY',
        'Access-Control-Allow-Headers':
          'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      });

      let urlBase = this.configService.getConfig().baseUrlFron;

      if (req.context.get(NO_API_KEY)) {
        urlBase = this.configService.getConfig().baseUrl;
      }

      const url = `${urlBase}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
      req = req.clone({ url, headers });
    }

    return next
      .handle(req)
      .pipe(finalize(() => this.spinnerService.hideLoader()));
  }
}

export const baseInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
];
