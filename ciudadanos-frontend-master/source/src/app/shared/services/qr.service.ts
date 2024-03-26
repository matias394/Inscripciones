import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class QRService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public getQR(userInfo: any, token: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(
      this.config.getConfig().backendServiciosExternos + `/api/qr/getQr`,
      userInfo,
      {
        headers: new HttpHeaders(objectHeaders),
        responseType: 'text',
      }
    );
  }
}
