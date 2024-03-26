import { Seccion } from './../modelos/seccion';
import { ComunicacionBarraSeccionesService } from './comunicacion-barra-secciones.service';
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModeloCampoFormulario, VisibilidadCampoFormulario } from '../modelos/modelo-campo-formulario';
import { modeloCampoFormularioFactory } from '../tipos/modelo-campo-formulario-factory';
import { Subject } from 'rxjs';
import { GrupoIterativo } from '../tipos/grupo-iterativo/grupo-iterativo';
import { MensajeDeSeccion } from '../modelos/mensaje-de-seccion';
import { removeNullOrUndefined } from '../funciones/remove-null-or-undefined';
import { FORMLY_TIPO_FORMULARIO } from '../constantes/formularios-avanzados-tipos';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  seccionesImportadas = new Subject();
  seccionEliminada = new Subject<number>();
  seccionSeleccionadaEliminada = new Subject();
  colaDeMensajes = new Subject<MensajeDeSeccion>();

  secciones: Seccion[] = [
    { fields: [] }
  ];

  constructor(
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) { }

  inicializarServicio() {
    this.secciones = [{ fields: [] }];
  }

  getFormly() {
    const formlySecciones = [];
    for (let i = 0; i < this.secciones.length; i++) {
      const seccion = this.secciones[i];
      let formlySeccion = [];
      for (let j = 0; j < seccion.fields.length; j++) {
        const index = seccion.fields[j];
        const modelo = this.comunicacionBarraSeccionesService.campos[index];

        // si tiene un template lo cargamos
        if (modelo.modelo.configuracionFormlyTemplate) {
          formlySeccion.push(removeNullOrUndefined(modelo.modelo.configuracionFormlyTemplate));
        }
        // limpiamos valores blancos (null or undefined)
        formlySeccion.push(removeNullOrUndefined(modelo.modelo.configuracionFormly));

        if (FORMLY_TIPO_FORMULARIO.includes(modelo.modelo.tipo)) {
          formlySeccion = Object.values(formlySeccion[0]).map(campo => {
            return campo;
          });
        }
      }
      formlySecciones.push({
        fields: formlySeccion
      });
    }
    return formlySecciones;
  }

  /**
   * @param numeroSeccion numero de seccion a eliminar. Indice basado en 1
   */
  eliminarSeccion(numeroSeccion: number) {
    const claveActual = this.comunicacionBarraSeccionesService.claveActual;
    if (claveActual === `${numeroSeccion}` || this.contieneCampo(numeroSeccion, claveActual)) {
      // se eliminó la seccion vacia seleccionada o la seccion que contenia el campo seleccionado
      // @ts-ignore
      this.seccionSeleccionadaEliminada.next();
    }

    // eliminamos los campos que contiene la seccion
    const campos = this.comunicacionBarraSeccionesService.campos;
    for (let i = 0; i < this.secciones[numeroSeccion - 1].fields.length; i++) {
      const claveCampo = this.secciones[numeroSeccion - 1].fields[i];
      if (campos[claveCampo].modelo instanceof GrupoIterativo) {
        for (let k = 0; k < (<GrupoIterativo>campos[claveCampo].modelo).campos.length; k++) {
          const claveCampoGrupoIterativo = (<GrupoIterativo>campos[claveCampo].modelo).campos[k].key;
          delete campos[claveCampoGrupoIterativo];
        }
      }
      delete campos[claveCampo];
    }

    this.secciones.splice(numeroSeccion - 1, 1);
    this.seccionEliminada.next(numeroSeccion);
  }

  importarSecciones(jsonSecciones: any) {
    // reiniciamos las variables
    this.comunicacionBarraSeccionesService.inicializarServicio();

    const secciones: Seccion[] = [];
    for (let i = 0; i < jsonSecciones.length; i++) {
      const jsonSeccion = jsonSecciones[i];
      const seccion: Seccion = {
        fields: []
      };
      for (let j = 0; j < jsonSeccion.fields.length; j++) {
        const formlyConfigCampo: FormlyFieldConfig = jsonSeccion.fields[j];

        const modelo: ModeloCampoFormulario = modeloCampoFormularioFactory(formlyConfigCampo);
        if (modelo == null) {
          // el modelo es null, es un componente que no se renderiza (ejemplo, templates)
          continue;
        }

        // creamos el campo sin seleccion para que la barra no se mueva
        this.comunicacionBarraSeccionesService.crearCampo(modelo, false);
        seccion.fields.push(formlyConfigCampo.key as string);
        if (modelo instanceof GrupoIterativo) {
          // manejamos los campos del grupo iterativo
          this.comunicacionBarraSeccionesService.grupoIterativoActual = modelo;

          const formlyCamposGrupoIterativo = modelo.configuracionFormly.templateOptions.camposFormulario;
          for (let k = 0; k < formlyCamposGrupoIterativo.length; k++) {
            const campoGrupoIterativo: ModeloCampoFormulario = modeloCampoFormularioFactory(formlyCamposGrupoIterativo[k]);
            if (campoGrupoIterativo == null) {
              // el modelo es null, es un componente que no se renderiza (ejemplo, templates)
              continue;
            }
            this.comunicacionBarraSeccionesService.crearCampo(campoGrupoIterativo, false);
            modelo.addCampo(campoGrupoIterativo);
            campoGrupoIterativo.datosGenerales['esDatoImportante'] = formlyCamposGrupoIterativo[k].templateOptions['esDatoImportante'];
          }
          this.comunicacionBarraSeccionesService.grupoIterativoActual = null;
        }
      }
      secciones.push(seccion);
    }
    this.secciones = secciones;
    this.seccionesImportadas.next(this.secciones);
  }

  /**
   * Retorna true si la seccion dada contiene la clave dada
   */
  contieneCampo(seccion: number, clave: string): boolean {
    return this.secciones[seccion - 1].fields.indexOf(clave) !== -1;
  }

  /**
   * chequea que la seccion a eliminar no contenga componentes de los que dependen los componentes que estan en otra seccion
   *
   * @param numeroSeccion numero de seccion a eliminar. Indice basado en 1
   */
  validarSiSePuedeEliminarSeccion(numeroSeccion: number): boolean {
    const campos = this.comunicacionBarraSeccionesService.campos;
    for (const clave in campos) {
      if (!this.contieneCampo(numeroSeccion, clave) && campos[clave].modelo.visibilidad) {
        // el campo actual no pertenece a la seccion que se está validando
        const claveDependencia = (<VisibilidadCampoFormulario>campos[clave].modelo.visibilidad).dependencia;
        if (claveDependencia !== null && this.contieneCampo(numeroSeccion, claveDependencia)) {
          // si el la seccion actual contiene al campo de la dependencia, entonces la seccion no
          // se puede eliminar, porque la dependencia está en otra sección
          return false;
        }
      }
    }

    return true;
  }

  existenSeccionesVacias(): boolean {
    for (let i = 0; i < this.secciones.length; i++) {
      if (this.secciones[i].fields.length === 0) {
        return true;
      }
    }
    return false;
  }

  validarOrdenComponentes(): boolean {
    const listaRecorridos = [];
    for (let i = 0; i < this.secciones.length; i++) {
      for (let j = 0; j < this.secciones[i].fields.length; j++) {
        const clave = this.secciones[i].fields[j];
        const campo = this.comunicacionBarraSeccionesService.campos[clave];
        if (!campo.modelo.visibilidad) { continue; }

        let claveDependencia = (<VisibilidadCampoFormulario>campo.modelo.visibilidad).dependencia;
        let claveDependenciaValores = (<VisibilidadCampoFormulario>campo.modelo.visibilidad).dependenciaValores;

        if (claveDependencia && listaRecorridos.indexOf(claveDependencia) === -1 ||
          claveDependenciaValores && listaRecorridos.indexOf(claveDependenciaValores) === -1) {
          // si en la lista de claves recorridas no existe la dependencia,
          // entonces la dependencia del componente está abajo del componente que se está recorriendo
          return false;
        }
        listaRecorridos.push(clave);

        if (campo.modelo instanceof GrupoIterativo) {
          for (let k = 0; k < campo.modelo.campos.length; k++) {
            const campoGI = campo.modelo.campos[k];

            claveDependencia = (<VisibilidadCampoFormulario>campoGI.visibilidad).dependencia;
            claveDependenciaValores = (<VisibilidadCampoFormulario>campoGI.visibilidad).dependenciaValores;

            if (claveDependencia && listaRecorridos.indexOf(claveDependencia) === -1 ||
              claveDependenciaValores && listaRecorridos.indexOf(claveDependenciaValores) === -1) {
              // si en la lista de claves recorridas no existe la dependencia,
              // entonces la dependencia del componente está abajo del componente que se está recorriendo
              return false;
            }
            listaRecorridos.push(campoGI.key);
          }
        }
      }
    }
    return true;
  }

  verificarGruposIterativosNoVacios(): boolean {
    for (let i = 0; i < this.secciones.length; i++) {
      for (let j = 0; j < this.secciones[i].fields.length; j++) {
        const clave = this.secciones[i].fields[j];
        const campo = this.comunicacionBarraSeccionesService.campos[clave];
        if (campo.grupoIterativo && !(campo.modelo as GrupoIterativo).contieneCamposHijos()) {
          return false;
        }
      }
    }
    return true;
  }

  verificarGruposIteratiovsAlMenosUnoImportante(): boolean {
    for (let i = 0; i < this.secciones.length; i++) {
      for (let j = 0; j < this.secciones[i].fields.length; j++) {
        const clave = this.secciones[i].fields[j];
        const campo = this.comunicacionBarraSeccionesService.campos[clave];
        if (campo.grupoIterativo && !(campo.modelo as GrupoIterativo).contieneAlMenosUnHijoImportante()) {
          return false;
        }
      }
    }
    return true;
  }

  // Permite emitir mensajes que se motraran en el feedback panel general de creando formulario
  // refactorizar
  emitirMensaje(mensaje: string, esMensajeExito: boolean): void {
    this.colaDeMensajes.next({ mensaje: mensaje, esMensajeExito: esMensajeExito });
  }
}
