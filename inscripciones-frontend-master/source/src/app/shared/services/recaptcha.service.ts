import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private Url;

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.Url = this.configService.getConfig().baseUrl;
  }

  public getTokenClientModule(
    token: string,
    tokenUser: string,
    cuil: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenUser}`,
    });
    const payload = {
      self: cuil,
      token: token,
    };
    return this.http.post<any>(`${this.Url}recaptcha`, payload, {
      headers: headers,
      responseType: 'json',
    });
  }
}
