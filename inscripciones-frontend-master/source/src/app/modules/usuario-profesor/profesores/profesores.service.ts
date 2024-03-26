import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  constructor(private http: HttpClient) {}
  private spinnerActive: Subject<boolean> = new Subject<boolean>();
  public spinnerActiveObs = this.spinnerActive.asObservable();

  public getCursos(
    usuarioId: any,
    page?: number,
    size?: number,
    sort?: string,
    searchTerm?: string
  ): Observable<any> {
    return this.http.get<any>(
      `/inscripciones/instancia_profesor/${usuarioId}?page=${page}&size=${size}&sort=${sort}&filter=${searchTerm}`
    );
  }

  public getCursoData(id: any): Observable<any> {
    return this.http.get<any>(`/inscripciones/data/${id}`);
  }

  public getNestedDataInTable(
    idInscripcion: any,
    idUsuario: any
  ): Observable<any> {
    return this.http.get<any>(`/instancias/${idInscripcion}/${idUsuario}`);
  }
}
