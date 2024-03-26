import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  fetchFormulario(data: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get(
      this.config.getConfig().backendCiudadanoLectura + `/v1/formularios/getFormByIdRefMongo/${data.formId}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  sendResponse(data: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get(
      this.config.getConfig().backendClient + `/v1/formularios/sendResponse`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public getFormByIdInscripcion(id: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoLectura +
        `/v1/formularios/getFormByIdInscripcion/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public saveCitizenResponse(body: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      this.config.getConfig().backendCiudadanoEscritura + `/v1/inscripciones`,
      body,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getResultsByCuilMibaAndIdInscripcion(
    cuilMiba: any,
    idInscripcion: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient +
        `/v1/formularios/getResultsByCuilMibaAndIdInscripcion/${cuilMiba}/${idInscripcion}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getResultsByCuilAndIdInscripcion(
    cuil: any,
    idInscripcion: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoEscritura +
        `/v1/formularios/getResultsByCuilAndIdInscripcion/${cuil}/${idInscripcion}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getCounterByInscriptionId(
    idInscripcion: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient +
        `/v1/formularios/getCounterByinscripcionId/${idInscripcion}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getCounterByInstancianId(
    idInstancia: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient +
        `/v1/formularios/getCounterByinstanciaId/${idInstancia}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getResultsByCuilMibaAndIdInstancia(
    cuilMiba: any,
    idInstancia: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient +
        `/v1/formularios/getResultsByCuilMibaAndIdInstancia/${cuilMiba}/${idInstancia}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getResultsByCuilAndIdInstancia(
    cuil: any,
    idInstancia: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendClient +
        `/v1/formularios/getResultsByCuilAndIdInstancia/${cuil}/${idInstancia}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getResultsByCuilAndIdInstanciaSedeId(
    cuil: any,
    idInstanciaSede: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoEscritura +
        `/v1/formularios/getResultsByCuilAndIdInstanciaSedeId/${cuil}/${idInstanciaSede}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getCountByCuilAndIdInstanciaSedeId(
    cuil: any,
    idInstanciaSede: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoEscritura +
        `/v1/formularios/getCountByCuilAndIdInstanciaSedeId/${cuil}/${idInstanciaSede}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }

  public getCounterByinstanciaSedeId(
    idInstanciaSede: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendCiudadanoEscritura +
        `/v1/formularios/getCounterByinstanciaSedeId/${idInstanciaSede}`,
      { headers: new HttpHeaders(objectHeaders) }
    );
  }
}
