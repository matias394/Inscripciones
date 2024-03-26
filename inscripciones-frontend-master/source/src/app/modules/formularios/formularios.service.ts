import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '@providers/app-config.service';
@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}

  fetchFormularios(
    page: number,
    size: number,
    searchTerm: string
  ): Observable<any> {
    return this.http.get(
      `${
        this.configService.getConfig().baseUrl +
        `formularios?page=${page}&size=${size}&sort=id,desc&filter=${searchTerm}`
      }`,
      this.httpOptions
    );
  }
  fetchFormulario(data: any): Observable<any> {
    return this.http.get(
      `${this.configService.getConfig().baseUrl + 'formularios/'}show/${data}`,
      this.httpOptions
    );
  }

  storeForm(data: any): Observable<any> {
    return this.http.post(
      `${this.configService.getConfig().baseUrl + 'formularios/'}save`,
      data,
      this.httpOptions
    );
  }
}
