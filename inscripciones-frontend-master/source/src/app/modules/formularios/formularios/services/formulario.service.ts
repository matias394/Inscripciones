import { EventEmitter, Injectable } from '@angular/core';
//import { HttpTramites } from '../../shared/service/http-tramites.service';
import { Formulario } from '../modelos/formulario';
import { Observable } from 'rxjs';
//import { PeticionGuardarTramite } from './peticiones/peticion-tramite';
//import { DatosEntrega } from './model/datos-entrega';
//import { ComprobanteTramite } from '../componentes/comprobante-tramite/modelo/comprobante-tramite';
//import { InformacionSubsanacion } from './model/informacion-subsanacion';
///import { FormularioBusqueda } from 'src/app/tramites-backend/formularios/modelos/formulario-busqueda';
//import { TipoTramiteFormulario } from './model/tipo-tramite-formulario';
//import { PerfilMIBA } from '@shared/modelo/perfil-miba';
//import { RespuestaObtenerBoletaBui } from './model/respuesta-obtener-boleta-bui';
//import { TipoTramiteFormaPago } from './model/tipo-tramite-forma-pago';
//import { GrupoInfracciones } from 'src/app/shared/modelo/infracciones/grupo-infracciones';
import { map } from 'rxjs/operators';
import { PeticionFormulario } from '../peticiones/peticion-formulario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { result } from 'underscore';
import { FormlyComponent } from '../modelos/formly-component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidadorFormulario } from '../modelos/validador-formulario';
//import {PeticionFormulario} from "../peticiones/peticion-formulario";
//import { Legajo } from 'src/app/shared/modelo/legajos/legajos';
import { AppConfigService } from '@providers/app-config.service';

@Injectable()
export class FormularioService {
  private _siguienteStep: EventEmitter<any> = new EventEmitter<any>();
  private _habilitarOcultarField: EventEmitter<any> = new EventEmitter<any>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  formularioParse = {
    id: null,
    nombre: null,
    puedeEditarseNombre: true,
    campos: [],
    validadores: [],
  };
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}

  getFormularioPorNombre(
    nombreFormulario: string,
    version?: number
  ): Observable<Formulario> {
    //return this.httpTramites.get<Formulario>('administracion/formulario/' + nombreFormulario + '/' + version);
    return null;
  }

  getFormulario(id: number): Observable<Formulario> {
    // return this.httpTramites.get<Formulario>('administracion/formulario/' + id);
    return null;
  }

  /*  getFormularios(): Observable<FormularioBusqueda[]> {
    return this.httpTramites.get<FormularioBusqueda[]>('administracion/formulario/')
      .pipe(
        map(formularios => formularios.map(formulario => new FormularioBusqueda(formulario)))
      );
  }*/

  /*  getFormulariosNoAsignados(): Observable<FormularioBusqueda[]> {
    return this.httpTramites.get<FormularioBusqueda[]>('administracion/formulario/noAsignados')
      .pipe(
        map(formularios => formularios.map(formulario => new FormularioBusqueda(formulario)))
      );
  }*/

  /*  guardarTramite(
    jsonDocument: any,
    tipoTramiteFormulario: TipoTramiteFormulario,
    formaPago: TipoTramiteFormaPago,
    perfilMiba: PerfilMIBA,
    mailContacto: string,
    datosEntrega: DatosEntrega,
    cantidadSecciones: number,
    boletaPaga: RespuestaObtenerBoletaBui,
    grupoInfracciones: GrupoInfracciones,
    legajo: Legajo
  ): Observable<ComprobanteTramite> {
    return this.httpTramites.post<any>('administracion/tramite/guardar/',
      new PeticionGuardarTramite(
        jsonDocument,
        tipoTramiteFormulario,
        formaPago,
        perfilMiba,
        mailContacto,
        datosEntrega,
        cantidadSecciones,
        boletaPaga,
        grupoInfracciones,
        legajo
      ),
      true
    );
  }*/

  /*  getInformacionSubsanacion(token: string): Observable<InformacionSubsanacion> {
    return this.httpTramites.get<any>('administracion/tramite/informacionSubsanacion?tokenIdSubsanacion=' + token);
  }*/

  subsanarTramite(
    idTramite: number,
    documentCamposCompletados: any
  ): Observable<void> {
    /*   return this.httpTramites.post<any>('administracion/tramite/realizarsubsanacion/', {
      idTramite,
      documento: documentCamposCompletados
    });*/
    return null;
  }

  eliminarFormulario(id: number): Observable<any> {
    /* return this.httpTramites.delete<any>('administracion/formulario/' + id)
      .pipe(
        map(formularios => formularios.map(formulario => new FormularioBusqueda(formulario)))
      );*/
    return null;
  }

  guardarFormulario(formulario: Formulario) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    const peticionFormulario: PeticionFormulario = new PeticionFormulario(
      formulario
    );
    const formularioParse = this.parseIn(formulario);
    return this.http.post<any>(
      this.configService.getConfig().baseUrl + 'formularios/save',
      formularioParse,
      { headers }
    );
  }

  editarFormulario(formulario: Formulario) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    const peticionFormulario: PeticionFormulario = new PeticionFormulario(
      formulario
    );
    const formularioParse = this.parseIn(formulario);
    return this.http.post<any>(
      this.configService.getConfig().baseUrl +
        'formularios/edit/' +
        formulario.id,
      formularioParse,
      { headers }
    );
  }

  exportarFormularios(formulariosId: number[]): Observable<any> {
    //return this.httpTramites.post<any>('administracion/formulario/exportar', JSON.stringify(formulariosId), true, false);
    return null;
  }

  siguienteStepEmit(value) {
    this._siguienteStep.emit(value);
  }

  habilitarOcultarFieldsEmit(fields: string[], ocultar: boolean) {
    this._habilitarOcultarField.emit({ fields, ocultar });
  }

  get siguienteStep(): EventEmitter<any> {
    return this._siguienteStep;
  }
  get habilitarOcultarField(): EventEmitter<any> {
    return this._habilitarOcultarField;
  }

  parseIn(formulario: Formulario) {
    const formularioInitial = {
      id: formulario.id,
      nombre: formulario.nombre,
      descripcion: null,
      inscripcion_id: 0,
      puedeEditarseNombre: null,
      campos: null,
    };
    formularioInitial.nombre = formulario.nombre;
    formularioInitial.puedeEditarseNombre = formulario.puedeEditarseNombre;
    formularioInitial.puedeEditarseNombre = formulario.puedeEditarseNombre;
    formularioInitial.campos = JSON.stringify(formulario.campos).replace(
      '"',
      "'"
    );
    return formularioInitial;
  }

  parseBack(formulario): Formulario {
    formulario.forEach((result) => {
      this.formularioParse.id = result.id;
      this.formularioParse.nombre = result.nombre;
      this.formularioParse.puedeEditarseNombre = result.puedeEditarseNombre;
      this.formularioParse.campos = JSON.parse(result.campos.replace("'", '"'));
      this.formularioParse.validadores = [];
    });

    return this.formularioParse;
  }
}
