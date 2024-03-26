import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemPerPage } from '../shared/types';
import { skipApiKey } from '../shared/http.context';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService {
  constructor(private http: HttpClient) {}

  public getDataCategory(id: number): Observable<any> {
    return this.http.get<any>(`/categorias/${id}`, {
      context: skipApiKey(),
    });
  }

  public getOrganismos(page: number, searchTerm: string): Observable<any> {
    return this.http.get<any>(
      `/organismos?page=${page}&size=${ItemPerPage}&sort=id&filter=${searchTerm}`
    );
  }

  public getCategoriesByOrganismos(
    page: number = 0,
    idOrganization: number,
    searchTerm: string = ''
  ): Observable<any> {
    return this.http.get<any>(
      `/categorias/${idOrganization}?page=${page}&size=${ItemPerPage}&sort=id&filter=${searchTerm}`
    );
  }

  public getCursoByCategory(
    idCategory: number,
    idOrganization: number,
    page: number,
    searchTerm: string = ''
  ): Observable<any> {
    return this.http.get<any>(
      `/inscripciones/${idCategory}/${idOrganization}?page=${page}&size=8&sort=id&filter=${searchTerm}`
    );
  }
}
