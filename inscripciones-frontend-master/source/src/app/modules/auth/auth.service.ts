import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, scan } from 'rxjs';
import { AppConfigService } from '@providers/app-config.service';
import { TokenStorageService } from './token-storage.service';
import { ErrorHTTPService } from '@components/error-http/error-http.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  checkSession(): Observable<any> {
    return this.http.get(
      `${this.configService.getConfig().baseUrl}roles`,
      this.httpOptions
    );
  }

  getTimeOut() {
    const timeValidation = this.tokenService.getUser().timeValidation;
    const timeRefresh = timeValidation - 1;

    return {
      timeOut: timeValidation * 60 * 1000,
      timeRefresh: timeRefresh * 60 * 1000,
    }; // 900000 === 15min
  }

  autoLogout() {
    this.tokenService.signOut();
    this.errorService.showAlert(401, 7000);
    this.router.navigate(['login']);
  }

  autoTokenRefresh(): Observable<any> {
    const token = this.tokenService.getToken();
    const formdata = new FormData();
    formdata.append('token', token);
    return this.http
      .post(`${this.configService.getConfig().baseUrl}login/refresh`, formdata)
      .pipe(scan((response, params) => {}));
  }
}
