import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';
import { sedesDto } from '../models/sedesDto';

@Injectable({
  providedIn: 'root',
})
export class SedesService {
  private Url;

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.Url = this.configService.getConfig().baseUrl;
  }

  public getSedes(
    page: number,
    size: number,
    searchTerm?: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      this.Url +
        `sede?page=${page}&size=${size}&sort=id,desc&filter=${searchTerm}`,
      {
        headers,
      }
    );
  } //NECESITA PAGINACION

  public getSedesById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.Url}sede/${id}`, { headers });
  }

  public createSedes(sede: sedesDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.Url + 'sede/crear', sede, { headers });
  }

  public updateSede(sede: sedesDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.Url + 'sede/editar', sede, { headers });
  }

  public deleteSedeById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(`${this.Url}sede/${id}`, { headers });
  }
}
