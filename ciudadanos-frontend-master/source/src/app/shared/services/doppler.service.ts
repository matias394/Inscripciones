import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DopplerDTO } from '@shared/models/dopplerDto';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class DopplerService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public sendMessageByDoppler(
    dopplerInfo: DopplerDTO,
    correoId: any,
    token: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      // this.config.getConfig().backendCiudadanoEscritura + `/v1/doppler/${correoId}`,
      this.config.getConfig().backendCiudadanoEscritura + `/v1/doppler`,
      dopplerInfo,
      { headers: headers }
    );
  }
}
