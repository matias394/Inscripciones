import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { reportesDto } from '@shared/models/reportesDto';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  public buscarReportesPost(
    page?: number,
    size?: number,
    sort?: string,
    reportesDto?: reportesDto
  ): Observable<any> {
    return this.http.post<any>(
      `reportes/elastidsearch/buscarReporte?page=${page}&size=${size}&sort=${sort}`,
      reportesDto
    );
  }

  public buscarReportesSinPaginado(reportesDto?: reportesDto): Observable<any> {
    return this.http.post<any>(
      `reportes/elastidsearch/buscarReporte/all`,
      reportesDto
    );
  }
}
