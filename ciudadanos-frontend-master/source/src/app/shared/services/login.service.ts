import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public login(): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
    return this.http.post<any>(
      this.config.getConfig().backendServiciosExternos + `/api/login?cuil=123456789&password=1234`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public refreshToken(token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      this.config.getConfig().backendClient +
        `/v1/login/refresh?token=${token}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }
}
