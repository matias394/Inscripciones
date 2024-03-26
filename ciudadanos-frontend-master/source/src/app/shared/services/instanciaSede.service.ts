import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class InstanciaSedeService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public getInstanciaSedeById(id: number, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient + `/v1/instancias_sedes/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public getInstanciaSedeByBusqueda(
    id: number,
    page: number,
    size: number,
    busqueda: string,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoLectura +
        `/v1/instancias_sedes/inscripciones/busqueda/${id}?busqueda=${busqueda}&page=${page}&size=${size}&sort=id`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }
}
