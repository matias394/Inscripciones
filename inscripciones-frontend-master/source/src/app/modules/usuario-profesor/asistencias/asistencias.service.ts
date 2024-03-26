import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciasService {
  constructor(private http: HttpClient) {}

  public getSedesAsignadas(
    usuarioId: any,
    page: number,
    size: number,
    sort?: string,
    searchTerm?: string
  ): Observable<any> {
    return this.http.get<any>(
      `/sede/sede_profesor/${usuarioId}?page=${page}&size=${size}&sort=${sort}&filter=${searchTerm}`
    );
  }

  getCursosPorSede(sedeId: any, usuarioId: any): Observable<any> {
    return this.http.get<any>(`/inscripciones/sedes/${sedeId}/${usuarioId}`);
  }

  public getClases(instanciaId: any): Observable<any> {
    return this.http.get<any>(`/clases/all/${instanciaId}`);
  }

  public getClaseAlumno(instanciaId: any, claseId: any): Observable<any> {
    return this.http.get<any>(
      `/clase_alumno/asistencia/${instanciaId}/${claseId}`
    );
  }

  public getNestedDataInTable(
    idInscripcion: any,
    idUsuario: any
  ): Observable<any> {
    return this.http.get<any>(`/instancias/${idInscripcion}/${idUsuario}`);
  } //ASI ESTA AHORA Y NO TRAE DATA

  public getNestedDataInTableOld(idInscripcion: any): Observable<any> {
    return this.http.get<any>(`/instancias/${idInscripcion}`); //ASI ESTABA ANTES
  }

  public putAsistencia(asistenciaDTO): Observable<any> {
    return this.http.put<any>(`/clase_alumno/asistencia`, asistenciaDTO);
  }

  public putAsistenciaUser(
    claseId: any,
    usuarioId: any,
    asistencia: any
  ): Observable<any> {
    return this.http.put<any>(
      `/clase_alumno/asistencia/${claseId}/${usuarioId}/${asistencia}`,
      ''
    );
  }
}
