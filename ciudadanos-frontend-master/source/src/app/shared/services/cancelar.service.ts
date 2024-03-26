import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class CancelarService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public getCancelacionInformationByMongoId(
    id: any,
    token: any
  ): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(
      this.config.getConfig().backendServiciosExternos +
        `/api/formularios/getCancellationInfo/${id}`,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public cancelarInscripcion(mongoID: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>(
      this.config.getConfig().backendServiciosExternos +
        `/api/formularios/cancelCitizenInscription?mongoId=${mongoID}`,
      {},
      { headers: new HttpHeaders(objectHeaders) }
    );
  }
}
