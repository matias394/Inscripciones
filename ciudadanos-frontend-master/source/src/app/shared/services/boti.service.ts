import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BodyBotiDto } from '@shared/models/bodyBotiDto';
import { AppConfigService } from '@shared/providers/appConfig.service';
@Injectable({
  providedIn: 'root',
})
export class BotiService {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.config.getConfig();
  }

  public BotiIntent(bodyBotiDto: BodyBotiDto): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'access-token': this.config.getConfig().botiToken,
    };
    return this.http.post<any>(
      this.config.getConfig().botiIntent,
      bodyBotiDto,
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public BotiMultiple(listBodyBotiDto: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'access-token': this.config.getConfig().botiToken,
    };
    return this.http.post<any>(
      this.config.getConfig().botiMultiple,
      { items: listBodyBotiDto },
      {
        headers: new HttpHeaders(objectHeaders),
      }
    );
  }

  public sendBotiMessage(
    bodyBotiDto: BodyBotiDto,
    token: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      // this.config.getConfig().backendCiudadanoEscritura + `/v1/doppler/${correoId}`,
      this.config.getConfig().backendCiudadanoEscritura + `/v1/boti`,
      bodyBotiDto,
      { headers: headers }
    );
  }
}
