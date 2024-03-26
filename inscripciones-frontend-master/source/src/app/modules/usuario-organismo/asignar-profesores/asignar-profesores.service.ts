import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { asignarProfesorDto } from '@shared/models/asignarProfesorDto';

@Injectable({
  providedIn: 'root',
})
export class AsignarProfesoresService {
  constructor(private http: HttpClient) {}

  public getListaInscripciones(
    idOrganismo: number,
    idTipo: number,
    idUsuario: number,
    page: number,
    size: number,
    sort?: any,
    searchTerm?: string
  ): Observable<any> {
    return this.http.get<any>(
      `/inscripciones/organismos_tipo/page/${idOrganismo}/${idTipo}/${idUsuario}?page=${page}&size=${size}&sort=${sort}&filter=${searchTerm}`
    );
  }

  public getDataConsultaCurso(id: number): Observable<any> {
    return this.http.get<any>(`/inscripciones/data/${id}`);
  }

  public getDataConsultaCursoInstancia(id: number): Observable<any> {
    return this.http.get<any>(`/inscripciones/data/instancias/${id}`);
  }

  public getDataConsultaCursoInstanciaSede(id: number): Observable<any> {
    return this.http.get<any>(
      `/inscripciones/data/instancias/instancia_sede/${id}`
    );
  }

  public getInstancias(id: number): Observable<any> {
    return this.http.get<any>(`/instancias/${id}`);
  }

  public getInstanciasOne(id: number): Observable<any> {
    return this.http.get<any>(`/instancias/citizen/${id}`);
  }

  public getInstanciaSedes(instanciaSedeId: number): Observable<any> {
    return this.http.get<any>(`/clases/instancia_sede/${instanciaSedeId}`);
  }

  public getOrganismosProfesor(
    organismoId: number,
    inscripcionId: number
  ): Observable<any> {
    return this.http.get<any>(
      `/usuarios/organismos_profesor/${organismoId}/${inscripcionId}`
    );
  }

  public asignarProfesorInstancias(asignarProfesorDto: asignarProfesorDto) {
    return this.http.post<any>(
      `/inscripciones/asignar_profesor/instancias`,
      asignarProfesorDto
    );
  }

  public asignarProfesorClases(asignarProfesorDto: asignarProfesorDto) {
    return this.http.post<any>(
      `/inscripciones/asignar_profesor/clases`,
      asignarProfesorDto
    );
  }

  public asignarProfesorClase(asignarProfesorDto: asignarProfesorDto) {
    return this.http.post<any>(
      `/inscripciones/asignar_profesor/clase`,
      asignarProfesorDto
    );
  }

  public getClases(id: number): Observable<any> {
    return this.http.get<any>(`/clases/instancias_clases/${id}`);
  }

  public getClase(id: number): Observable<any> {
    return this.http.get<any>(`/clases/${id}`);
  }

  public getSedesEnOrganismos(
    organismoId: number,
    idTipo: number,
    usuarioId: number,
    page: number,
    size?: number,
    sort?: string,
    searchTerm?: string
  ): Observable<any> {
    return this.http.get<any>(
      `/sede/organismos/tipos/usuarios/${organismoId}/${idTipo}/${usuarioId}?page=${page}&size=${size}&sort=${sort}&filter=${searchTerm}`
    );
  }

  public getInstanciasEnSedes(idTipo: number, idSede: number): Observable<any> {
    return this.http.get<any>(
      `/instancias/instancias/tipos/sedes/${idTipo}/${idSede}`
    );
  }

  public getClaseAlumno(instanciaId: any, claseId: any): Observable<any> {
    return this.http.get<any>(
      `/clase_alumno/asistencia/${instanciaId}/${claseId}`
    );
  }

  public getDetails(id: number): Observable<any> {
    return this.http.get<any>(`/instancias/detalle/${id}`);
  }

  //PARA ASISTENCIAS

  public getAllClases(
    instanciaId: any,
    sedeId: any,
    usuarioId: any
  ): Observable<any> {
    return this.http.get<any>(
      `/clases/instancia_sede_usuario/${instanciaId}/${sedeId}/${usuarioId}`
    ); //Para Profesores
  }

  public getAllClasesEventos(instanciaId: any, sedeId: any): Observable<any> {
    return this.http.get<any>(
      `/clases/instancia_sede/${instanciaId}/${sedeId}`
    ); //Para eventos
  }

  public getAllClasesCursos(instanciaId: any, sedeId: any): Observable<any> {
    return this.http.get<any>(
      `/clases/instancia_sede/${instanciaId}/${sedeId}`
    ); //Para cursos
  }

  public getAllClasesByInstanciaSede(instanciaSedeId: number): Observable<any> {
    return this.http.get<any>(`/clases/instancia_sede/${instanciaSedeId}`); //Para cursos
  }

  public getNestedDataInTable(idInscripcion: any): Observable<any> {
    return this.http.get<any>(`/instancias/${idInscripcion}`); //PARA CURSO Y EVENTO
  }

  public getCursosPorSede(
    organismoId: number,
    tipoId: number,
    sedeId: number,
    userId: number
  ): Observable<any> {
    return this.http.get<any>(
      `/inscripciones/organismos_tipo_sede/data/${organismoId}/${tipoId}/${sedeId}/${userId}`
    ); //PARA CURSO Y EVENTO
  }

  public getClaseAlumnoData(instanciaId: any, claseId: any): Observable<any> {
    return this.http.get<any>(
      `/clase_alumno/asistencia/data/${instanciaId}/${claseId}`
    );
  }

  public getClasesByInstanciaSede(instanciaSedeId: number): Observable<any> {
    return this.http.get<any>(`/clases/instancia_sede/data/${instanciaSedeId}`); //Para cursos
  }

  public getAllClasesByInstanciaSedeOp(instanciaSedeId: number): Observable<any> {
    return this.http.get<any>(`/clases/instancia_sede/op/${instanciaSedeId}`); //Para cursos
  }


}
