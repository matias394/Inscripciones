import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BodyBotiDto } from '../models/bodyBotiDto';
import { AppConfigService } from '@providers/app-config.service';
@Injectable({
  providedIn: 'root',
})
export class BotiService {
  Url: string;
  token: string;
  UrlMultiple: string;

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.Url = this.config.getConfig().botiIntent;
    this.UrlMultiple = this.config.getConfig().botiMultiple;
    this.token = this.config.getConfig().botiToken;
  }

  public BotiIntent(bodyBotiDto: BodyBotiDto): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'access-token': this.token,
    };
    return this.http.post<any>(this.Url, bodyBotiDto, {
      headers: new HttpHeaders(objectHeaders),
    });
  }

  public BotiMultiple(listBodyBotiDto: any): Observable<any> {
    const objectHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'access-token': this.token,
    };
    return this.http.post<any>(
      this.UrlMultiple,
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
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Accept: '*/*',
    //   // Authorization: `Bearer ${token}`,
    // });
    const objectHeaders = {
      'Skip-Authorization': 'true'
    };
    return this.http.post<any>(
      this.config.getConfig().backendCiudadanoEscritura + `/v1/boti`,
      bodyBotiDto,
      { headers: objectHeaders }
    );
  }
}
