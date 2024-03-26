import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class InstanciaSedeService {
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}

  private backendCiudadanoLectura: string =
    this.configService.getConfig().backendCiudadanoLectura;

  public getInstanciaSedeById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`instancia_sedes/${id}`, { headers });
  }

  public getInstanciasEnInstanciaSede(
    instanciaId: number,
    page: number,
    size: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      `instancia_sedes/instancias/${instanciaId}?page=${page}&size=${size}`,
      {
        headers,
      }
    );
  }

  public getInstanciasEnInscripcion(inscripcionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`instancias/filtro/${inscripcionId}`, {
      headers,
    });
  }

  public getSedesEnInstancia(instanciaId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`sede/filtro/${instanciaId}`, {
      headers,
    });
  }

  public validateStudentByClassIdAndCuil(
    id: number,
    cuil: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`instancia_sedes/${id}/${cuil}`, { headers });
  }

  public getInstanciaByInscripcionId(
    inscripcionId: number,
    page: number,
    size: number,
    sort: string,
    searchTerm: any
  ): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });

    const objectHeaders = {
      'Skip-Authorization': 'true',
    };

    return this.http.get<any>(
      `${this.backendCiudadanoLectura}/v1/instancias_sedes/inscripciones/busqueda/${inscripcionId}?busqueda=${searchTerm}&page=${page}&size=${size}&sort=id`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public getInstanciasByInscription(inscripcionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`instancias/${inscripcionId}`, {
      headers,
    });
  }

  public getInstanciasByInscriptionAndSede(
    inscripcionId: number,
    sedeId: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`instancias/data/${inscripcionId}/${sedeId}`, {
      headers,
    });
  }
}
