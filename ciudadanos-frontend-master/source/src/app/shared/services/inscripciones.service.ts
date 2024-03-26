import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public getInstanciasById(id: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient + `/v1/instancias/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public matriculaAuth(code: any, hash: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoLectura +
        `/v1/inscripciones/${code}/${hash}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getInscripcionById(id: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoLectura + `/v1/inscripciones/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public getNotificationById(id: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoLectura +
        `/v1/inscripciones/notificacacion/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public getLoginMibaById(id: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoLectura +
        `/v1/inscripciones/login_miba/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }
}
