import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class MibaServices {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public getMIBAConfiguration(): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return this.http.get<any>(
      this.config.getConfig().mibaURL +
        this.config.getConfig().realm +
        '/.well-known/openid-configuration',
      { headers: new HttpHeaders(objectHeaders), responseType: 'json' }
    );
  }

  public getMIBA_AuthRedirect(matricula: any, materia: any) {
    if (matricula != null && materia != null) {
      const state = matricula + '+' + materia;
      var ruta =
        this.config.getConfig().mibaURL +
        this.config.getConfig().realm +
        `/protocol/openid-connect/auth?client_id=${
          this.config.getConfig().client_id
        }&scope=${this.config.getConfig().scope}&redirect_uri=${
          this.config.getConfig().redirectUri
        }&response_type=${
          this.config.getConfig().response_type
        }&state=${state}`;
    } else {
      var ruta =
        this.config.getConfig().mibaURL +
        this.config.getConfig().realm +
        `/protocol/openid-connect/auth?client_id=${
          this.config.getConfig().client_id
        }&scope=${this.config.getConfig().scope}&redirect_uri=${
          this.config.getConfig().redirectUri
        }&response_type=${this.config.getConfig().response_type}`;
    }
    return ruta;
  }

  public getMIBA_LogoutRedirect() {
    var ruta =
      this.config.getConfig().mibaURL +
      this.config.getConfig().realm +
      `/protocol/openid-connect/logout?redirect_uri=${
        this.config.getConfig().redirectLogout
      }`;
    return ruta;
  }

  public getMIBAUserInfo(code: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(
      this.config.getConfig().backendServiciosExternos + `/api/miba/userinfo/${code}`,
      { headers: headers }
    );
  }

  public getMIBALevels(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.get<any>(
      this.config.getConfig().mibaURL +
        this.config.getConfig().realm +
        '/ui/niveles',
      { headers: headers }
    );
  }

  public MIBALogout(token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      this.config.getConfig().backendServiciosExternos + `/api/miba/logout/${token}`,
      { headers: headers }
    );
  }

  public getTokenMiba(code: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendServiciosExternos + `/api/miba/token/${code}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }
}
