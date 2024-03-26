import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inscripcionesDto } from '@shared/models/inscripcionesDto';
import { AppConfigService } from '@providers/app-config.service';
import { DataTableInstacias, sedesDto, Formulario } from './interfaces';
import { FormArray, FormControl } from '@angular/forms';

interface Data {
  dataSource: sedesDto;
  index: number;
}

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private url;
  privateheaders = new HttpHeaders({
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    'Content-Type': 'application/json',
  });

  private formInsSlcThree$ = new BehaviorSubject<Array<any>>([]);
  private dataSource$ = new BehaviorSubject<Data | null>({
    dataSource: null,
    index: null,
  });

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.url = this.configService.getConfig().baseUrl;
  }

  setDataSource(dataSource: sedesDto, index: number): void {
    this.dataSource$.next({ dataSource, index });
  }

  clearDataSource(): void {
    this.dataSource$.next({ dataSource: null, index: null });
  }

  getDataSource() {
    return this.dataSource$.asObservable().pipe(
      map((val) => {
        return val;
      })
    );
  }

  // setFormSlcThree(form: Array<any>) {
  //   this.formInsSlcThree$.next(form);
  // }
  // getFormSlcThree() {
  //   return this.formInsSlcThree$.asObservable().pipe(
  //     map((val) => {
  //       return val;
  //     })
  //   );
  // }

  public getInscripciones(): Observable<any> {
    return this.http.get<any>('/inscripciones?page=0&size=100&sort=id');
  }

  public getInscripcionesPorCategoria(
    categoriaId: number,
    organismoId: number
  ): Observable<any> {
    return this.http.get<any>(
      `/inscripciones/filtro/${categoriaId}/${organismoId}`
    );
  }

  public putInscripciones(inscripcionesDto: inscripcionesDto): Observable<any> {
    return this.http.put<any>('/inscripciones', inscripcionesDto);
  }

  public postInscripciones(
    inscripcionesDto: inscripcionesDto
  ): Observable<any> {
    return this.http.post<any>('/inscripciones', inscripcionesDto);
  }

  public deleteInscripciones(id: number): Observable<any> {
    return this.http.delete<any>(`/inscripciones/${id}`);
  }

  public unlockInscripciones(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.url + 'inscripciones/unlock/' + id, {
      headers,
    });
  }

  public getDataCorreos(): Observable<any> {
    return this.http.get<any>('/correos');
  }

  public getDataTipo(): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.url + 'correos', {
      headers,
    });
  }

  public getDataEdit(id: number): Observable<any> {
    return this.http.get<any>('inscripciones/' + id);
  }

  public generarInstancia(instanciaDto: DataTableInstacias): Observable<any> {
    return this.http.post<any>('/generarInstancias', instanciaDto);
  }

  public generarClaseSede(sede: sedesDto): Observable<any> {
    return this.http.post<any>('/generarClaseSede', sede);
  }

  // Funcion para pushear los dias en el FormArray dias del formulario Sedes (InstanciaSedes)
  public addDays(dataDays, formGroup) {
    dataDays.forEach((item) =>
      (formGroup.controls.dias as FormArray).push(new FormControl(item))
    );
  }

  public addClasesHorario(horario, formGroup) {
    horario.forEach((item) =>
      (formGroup.controls.claseHorarios as FormArray).push(
        new FormControl(item)
      )
    );
  }

  public addClase(dataClase, formGroup, horario) {
    dataClase.forEach((item) => {
      const data = { ...item, estado: 1, ...horario };
      return (formGroup.controls.claseDTOList as FormArray).push(
        new FormControl(data)
      );
    });
  }

  addInsSedeData(indexInstCurrent, newSedeData, formInscripciones) {
    const instanciaForm = formInscripciones.get('instancias') as FormArray;
    // Obtengo el FormGroup de Sedes segun el index del formulario Instancia
    const sedes = instanciaForm
      .at(indexInstCurrent)
      .get('instanciaSedes') as FormArray;
    // Push al forulario sede
    sedes.push(newSedeData);
    const { instanciaSedes } = instanciaForm.at(indexInstCurrent).value;
    this.setDataSource(newSedeData.value, indexInstCurrent);
  }

  addFormulario(data: Array<any>, form, formBuilder) {
    const ins = form.get('formularioInscripcion') as FormArray;
    data.forEach((item) => {
      ins.push(formBuilder.group(item));
    });
  }
}
