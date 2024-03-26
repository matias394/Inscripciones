import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, interval, Observable, of, scan } from 'rxjs';
import { AppConfigService } from '@providers/app-config.service';
import { ErrorHTTPService } from '@components/error-http/error-http.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
    }),
  };
  helper = new JwtHelperService();
  currentTime: any;

  constructor(
    private http: HttpClient,
    private configService: AppConfigService,
    private tokenService: TokenStorageService,
    private errorService: ErrorHTTPService,
    private router: Router
  ) {}

  getTimeOut() {
    const timeValidation = this.tokenService.getUser().timeValidation;
    const timeRefresh = timeValidation - 1;
    const dataExp = this.tokenService.getUser().exp * 1000;
    const iat = this.tokenService.getUser().iat * 1000;
    const token = this.tokenService.getToken();
    const currentDate = new Date().getDate();
    const expirationDate = this.helper.getTokenExpirationDate(token);

    console.log(
      expirationDate,
      expirationDate.getMinutes(),
      expirationDate.getTime()
    );

    const hasta = expirationDate.getMinutes();
    const desde = new Date(currentDate).getMinutes();
    // console.log('hasta:', hasta, dataExp);
    // console.log('desde:', desde, currentDate);
    // console.log(timeValidation * 60 * 1000);
    return {
      timeOut: timeValidation * 60 * 1000,
      timeRefresh: timeRefresh * 60 * 1000,
    }; // 900000 === 15min
  }

  public getInscripciones(): Observable<any> {
    return this.http.get<any>('/inscripciones?page=0&size=100&sort=id');
  }

  autoTokenRefresh(): Observable<any> {
    // console.log('autoTokenRefresh');
    // const token = this.tokenService.getToken();
    // const formdata = new FormData();
    // formdata.append('token', token);
    // const headers = new HttpHeaders({
    //   'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    //   'X-Frame-Options': 'DENY',
    //   'Access-Control-Allow-Headers':
    //     'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + token ?? '',
    // });
    // console.log({ token, formdata, headers });
    return this.http.get('https://google.com');
  }
}
