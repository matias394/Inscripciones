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
//import { PerfilMIBA } from 'src/app/shared/modelo/perfil-miba';
//import { RespuestaObtenerBoletaBui } from './model/respuesta-obtener-boleta-bui';
//import { TipoTramiteFormaPago } from './model/tipo-tramite-forma-pago';
//import { GrupoInfracciones } from 'src/app/shared/modelo/infracciones/grupo-infracciones';
import { map } from 'rxjs/operators';
import {PeticionFormulario} from "../peticiones/peticion-formulario";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {result} from "underscore";
//import {PeticionFormulario} from "../peticiones/peticion-formulario";
//import { Legajo } from 'src/app/shared/modelo/legajos/legajos';

@Injectable()
export class FormularioService {

  private _siguienteStep: EventEmitter<any> = new EventEmitter<any>();
  private _habilitarOcultarField: EventEmitter<any> = new EventEmitter<any>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
    ) {}

  getFormularioPorNombre(nombreFormulario: string, version?: number): Observable<Formulario> {
    //return this.httpTramites.get<Formulario>('administracion/formulario/' + nombreFormulario + '/' + version);
    return null;

  }

  getFormulario(id: number): Observable<Formulario> {
    //return this.httpTramites.get<Formulario>('administracion/formulario/' + id);
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

  subsanarTramite(idTramite: number, documentCamposCompletados: any): Observable<void> {
 /*   return this.httpTramites.post<any>('administracion/tramite/realizarsubsanacion/', {
      idTramite,
      documento: documentCamposCompletados
    });*/
    return null;
  }

/*  eliminarFormulario(id: number): Observable<any> {
    return this.httpTramites.delete<any>('administracion/formulario/' + id)
      .pipe(
        map(formularios => formularios.map(formulario => new FormularioBusqueda(formulario)))
      );
  }*/

  guardarFormulario(formulario: Formulario) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Content-Type': 'application/json',
    });
    let baseUrl = 'http://localhost:7090/inscripciones-service/api/formularios/'
    const peticionFormulario: PeticionFormulario = new PeticionFormulario(formulario);
    const formularioParse = this.parse(formulario);
    return this.http.post<any>(baseUrl + 'save', formularioParse, {headers});
  }

  exportarFormularios(formulariosId: number[]): Observable<any> {
    //return this.httpTramites.post<any>('administracion/formulario/exportar', JSON.stringify(formulariosId), true, false);
    return null;
  }

  siguienteStepEmit(value) {
    this._siguienteStep.emit(value);
  }

  habilitarOcultarFieldsEmit(fields: string[], ocultar: boolean) {
    this._habilitarOcultarField.emit({fields, ocultar});
  }

  get siguienteStep(): EventEmitter<any> {
    return this._siguienteStep;
  }
  get habilitarOcultarField(): EventEmitter<any> {
    return this._habilitarOcultarField;
  }

  parse(formulario:Formulario){

    const formularioParse =
      {
        id: formulario.id,
        nombre: formulario.nombre,
        descripcion: null,
        inscripcion_id: 0,
        inputGroup: []
      }
    const inputGroup =
      {
      fieldGroupClassName: "row",
        fieldGroup: []
    }

    const fieldGroup =
      {
      className: "col-12",
        key: null,
      type: null,
      templateOptions: {
      label: null,
        required: null,
        pattern: null,
        minLength: 0,
        maxLength: 0,
        options: [],
        extra_options: {
        integracion_miba: false,
          valor_miba: null,
          es_editable: null,
          es_subsanable: null,
          grupo_iterativo: null
      }
    },
      validation: {
        messages: {
          required: null,
            pattern: null
        }
      }
    }

    formulario.campos.forEach((result)=>{

      result.fields.forEach((resultFields)=>{
        formularioParse.descripcion = resultFields.templateOptions['description'] ? resultFields.templateOptions['description'] : '';
        fieldGroup.key = resultFields.key;
        fieldGroup.type = resultFields.type;
        fieldGroup.templateOptions.label = resultFields.templateOptions.label ? resultFields.templateOptions.label : '';
        fieldGroup.templateOptions.required = resultFields.templateOptions.required ? resultFields.templateOptions.required: '';
        fieldGroup.templateOptions.pattern = resultFields.templateOptions.pattern ? resultFields.templateOptions.pattern: '';
        fieldGroup.templateOptions.maxLength = resultFields.templateOptions['maxLength'] ? resultFields.templateOptions['maxLength'] : '';
        fieldGroup.templateOptions.minLength = resultFields.templateOptions['minLength'] ? resultFields.templateOptions['minLength'] : '';
        fieldGroup.templateOptions.extra_options.es_editable = resultFields['editableOperador'];
        fieldGroup.templateOptions.extra_options.es_subsanable = resultFields['subsanable'];
        const options = {
          label: null,
          value: null
        }
        if(resultFields.templateOptions.options){
          resultFields.templateOptions.options.forEach(optionsFields=>{
            options.label = optionsFields.descripcion;
            options.value = optionsFields.descripcion;
            fieldGroup.templateOptions.options.push(options)
          });
        }
        inputGroup.fieldGroup.push(fieldGroup);
      })

      formularioParse.inputGroup.push(inputGroup)
    });
    return formularioParse;
    }


}
