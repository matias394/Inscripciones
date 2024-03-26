import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@providers/app-config.service';
import { categoriasDto } from '../models/categoriaDto';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private Url;

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.Url = this.configService.getConfig().baseUrl;
  }

  public getCategoria(
    page: number,
    size: number,
    searchTerm?: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      this.Url +
        `categorias?page=${page}&size=${size}&sort=id,desc&filter=${searchTerm}`,
      { headers }
    );
  }

  public getCategoriaById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.Url}categorias/${id}`, { headers });
  }

  public getCategoriasUser(usuarioId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.Url}categorias/filtro/${usuarioId}`, {
      headers,
    });
  }

  public createCategoria(
    categorias: categoriasDto,
    idOrganismo: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      `${this.Url}categorias/${idOrganismo}`,
      categorias,
      { headers }
    );
  }

  public updateCategoria(
    categorias: categoriasDto,
    idOrganismo: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(
      `${this.Url}categorias/editar/${idOrganismo}`,
      categorias,
      { headers }
    );
  }

  public deleteCategoriaById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(`${this.Url}categorias/${id}`, { headers });
  }
}
