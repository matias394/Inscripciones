import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class InscritoService {
  private Url;
  private spinnerActive: Subject<boolean> = new Subject<boolean>();
  public spinnerActiveObs = this.spinnerActive.asObservable();

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.Url = this.configService.getConfig().baseUrl;
  }

  public getInscriptions(
    page: number,
    size: number,
    sort: string,
    name?: string,
    lastname?: string,
    cuil?: number
  ): Observable<any> {
    const headers = new HttpHeaders({});
    return this.http.get<any>(
      `${this.Url}inscritos?page=${page}&size=${size}&sort=${sort}&name=${name}&lastname=${lastname}&cuil=${cuil}`,
      {
        headers,
      }
    );
  }

  public getInscriptionsByCuil(
    cuil: string,
    page?: number,
    size?: number,
    sort?: string,
    filter?: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      `${this.Url}inscritos/getInscripcionByCuil/${cuil}?page=${page}&size=${size}&sort=${sort}&filter=${filter}`,
      { headers }
    );
  }

  public getInscriptionDetalleByMongoID(mongoID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      `${this.Url}inscritos/detalle?citizenResponseId=${mongoID}`,
      { headers }
    );
  }

  public cancelInscripcionByCuilAndInstanciaID(
    mongoID: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      `${this.Url}formularios/cancelCitizenInscription?mongoID=${mongoID}`,
      { headers }
    );
  }
}
