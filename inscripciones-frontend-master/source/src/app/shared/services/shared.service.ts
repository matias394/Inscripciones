import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncripcionView } from '@modules/inscripciones/interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private spinnerActive: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public getUserById(id): Observable<any> {
    return this.http.get<any>(`/usuarios/${id}`);
  }

  public getCorreos(): Observable<any> {
    return this.http.get<any>('/correos/all');
  }

  public getOrganismos(): Observable<any> {
    return this.http.get<any>('/organismos/all');
  }

  public getTipos(): Observable<any> {
    return this.http.get<any>('/tipos/all');
  }

  public getModalidades(): Observable<any> {
    return this.http.get<any>('/modalidades/all');
  }

  public getNotificaciones(): Observable<any> {
    return this.http.get<any>('/notificaciones/all');
  }

  public getSedes(): Observable<any> {
    return this.http.get<any>('/sede/all');
  }

  public getCategoriaById(id): Observable<any> {
    return this.http.get<any>(`/categorias/organismos/all/${id}`);
  }

  public getOrgaCatById(idOrg, idCat): Observable<any> {
    return this.http.get<any>(`/organismoCategoria/${idOrg}/${idCat}`);
  }

  public getFormularios(): Observable<any> {
    return this.http.get<any>(`/formularios/all`);
  }

  public getInscripciones(
    page?: number,
    size?: number,
    sort?: string,
    searchTerm?: string
  ): Observable<IncripcionView> {
    return this.http.get<IncripcionView>(
      `/inscripciones?page=${page}&size=${size}&sort=${sort}&filter=${searchTerm}`
    );
  }

  public getInscripcion(id): Observable<any> {
    return this.http.get<any>(`/inscripciones/${id}`);
  }

  public putInscripcion(id, inscripcion): Observable<any> {
    return this.http.put<any>(`/inscripciones/${id}`, inscripcion);
  }

  public deleteInscripcion(id): Observable<any> {
    return this.http.delete<any>(`/inscripciones/${id}`);
  }

  public getInstanciasById(id: any): Observable<any> {
    return this.http.get<any>(`/instancias/${id}`);
  }

  public getInstanciasWithSedes(id: any): Observable<any> {
    return this.http.get<any>(`/instancias/citizen/${id}`);
  }
}
