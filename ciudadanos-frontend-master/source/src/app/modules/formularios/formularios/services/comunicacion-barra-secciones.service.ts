import { GrupoIterativo } from './../tipos/grupo-iterativo/grupo-iterativo';
import { AbrirModalEvent } from './../modelos/events/abrir-modal-event';
import { ModeloCampoFormulario } from './../modelos/modelo-campo-formulario';
import { Subject, Observable } from 'rxjs';
import { Injectable, ElementRef } from '@angular/core';
import { CampoFormularioMap } from '../modelos/campo-formulario-map';
import { SeleccionCampoEvent } from '../modelos/events/seleccion-campo-event';
import { ValidadorFormulario } from '../modelos/validador-formulario';
// import { ConceptoDePago } from '../../tipos-de-tramite/modelo/concepto-pago';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionBarraSeccionesService {

  campos: CampoFormularioMap = {};
  // es la clave del campo seleccionado actualmente
  // si la clave va del 1 al 5, la seleccion está sobre una seccion vacía
  // si la clave empieza con 'grupo-iterativo-' está sobre un grupo iterativo vacío
  claveActual: string;

  // es el grupo iterativo actual, si no se está dentro de un grupo iterativo es igual a null
  grupoIterativoActual: GrupoIterativo = null;

  // evento que se lanza al intentar eliminar un grupo iterativo que contiene campos, para
  // que sea capturado en el componente 'ContenedorSeccionesFormularioComponent' y muestre
  // el modal de confirmacion
  intentoEliminarGrupoIterativo = new Subject<string>();

  //conceptosPagoVariablesDelTramite: ConceptoDePago[] = [];

  campoSeleccionado = new Subject<ElementRef>();
  cargarModal = new Subject<AbrirModalEvent>();
  campoCreado = new Subject<string>();
  campoEliminado = new Subject<string>();

  constructor() { }

  inicializarServicio() {
    this.campos = {};
    this.claveActual = null;
    //this.conceptosPagoVariablesDelTramite = [];
  }

  /**
   * en la seleccion actual se verifica si el campo pertenece a un grupo iterativo
   * de esta forma, al ingresar un campo nuevo, teniendo seleccionado un campo que pertenece
   * a un grupo iterativo, el nuevo campo se insertará debajo del componente actual y perteneciendo al mismo
   * componente iterativo
   */
  seleccionarCampo(seleccion: SeleccionCampoEvent) {
    const claveActual = seleccion.clave;
    // testeamos si la clave pertenece a un grupo iterativo vacio
    // es decir, empieza con 'grupo-iterativo-'
    const regexp = new RegExp('^grupo-iterativo-.*');
    if (regexp.test(claveActual)) {
      // estamos en un grupo iterativo vacio, obtenemos la clave
      const claveGrupoIterativo = claveActual.replace('grupo-iterativo-', '');

      // seteamos el grupo iterativo actual
      this.grupoIterativoActual = <GrupoIterativo>this.campos[claveGrupoIterativo].modelo;
    } else if (this.campos[seleccion.clave]) {
      // si la seleccion es cualquier otro componente, obtenemos su grupo iterativo
      // que puede ser null si el componente seleccionado no pertenece a un grupo iterativo
      this.grupoIterativoActual = this.campos[seleccion.clave].modelo.grupoIterativo;
    } else {
      // la seleccion actual en una seccion vacia
      this.grupoIterativoActual = null;
    }

    this.claveActual = claveActual;
    this.campoSeleccionado.next(seleccion.elemento);
  }

  crearModal(tipo: string, tab?: 'general' | 'validaciones' | 'visibilidad' | 'conceptos', modelo?: ModeloCampoFormulario) {
    if (modelo && modelo.grupoIterativo) {
      this.grupoIterativoActual = modelo.grupoIterativo;
    }

    const event: AbrirModalEvent = {
      tipo: tipo,
      tab: (tab) ? tab : 'general',
      modelo: modelo
    };
    this.cargarModal.next(event);
  }

  crearCampo(modelo: ModeloCampoFormulario, seleccionado: boolean = true) {
    const clave = modelo.key;
    if (this.validarNombreCampo(clave)) {

      if (this.grupoIterativoActual != null) {
        // seteamos el grupo iterativo para el campo
        modelo.grupoIterativo = this.grupoIterativoActual;

        // agregamos el campo al grupo iterativo
        this.grupoIterativoActual.addCampo(modelo, this.claveActual);
      }

      this.campos[clave] = {
        selected: seleccionado,
        modelo: modelo,
        grupoIterativo: (modelo instanceof GrupoIterativo)
      };
      if (seleccionado) {
        this.campoCreado.next(clave);
      }
    }
  }

  intentarEliminarCampo(clave: string, esGrupoIterativo?: boolean) {
    if (esGrupoIterativo) {
      this.intentoEliminarGrupoIterativo.next(clave);
    } else {
      this.eliminarCampo(clave);
    }
  }

  eliminarCampo(clave: string) {
    if (clave === this.claveActual) {
      // se elimina el campo que está seleccionado
      this.claveActual = null;
    }
    delete this.campos[clave];
    this.campoEliminado.next(clave);
  }

  /**
   * Valida que no exista otro campo con la misma clave
   *
   * @param campo campo que se va a validar
   */
  validarNombreCampo(clave: string): boolean {
    return !(<Object>this.campos).hasOwnProperty(clave);
  }

  getModal(): Observable<AbrirModalEvent> {
    return this.cargarModal.asObservable();
  }

  getGrupoIterativo(clave: string): GrupoIterativo {
    return this.campos[clave].modelo.grupoIterativo;
  }

  /**
   * Comprueba si el campo dado es parte de las dependencias de
   * otros campos
   *
   * @param clave la clave del campo que se busca validar
   */
  esDependenciaDeOtrosCampos(clave: string): boolean {
    return this.obtenerCamposQueDependenDelCampo(clave).length !== 0;
  }

  /**
   * Obtiene las claves de los campos que dependen de este campo
   *
   * @param clave la clave del campo para el que se quieren obtener las dependencias
   */
  obtenerCamposQueDependenDelCampo(clave: string): string[] {
    return Object.keys(this.campos).filter((key: string) => {
      const modelo = this.campos[key].modelo;
      if (!modelo.visibilidad) {
        return false;
      }
      return clave && (modelo.visibilidad['dependencia'] === clave ||
        modelo.visibilidad['dependenciaValores'] === clave);
    });
  }

  obtenerCamposQueDependenDelCampoEdicionTramite(clave: string): string[] {
    return Object.keys(this.campos).filter((key: string) => {
      const modelo = this.campos[key].modelo;
      if (!modelo.visibilidad || this.tipoExcluido(modelo.tipo)) {
        return false;
      }
      return clave && (modelo.visibilidad['dependencia'] === clave ||
        modelo.visibilidad['dependenciaValores'] === clave);
    });
  }

  tipoExcluido(tipo: string): boolean {
    return tipo === 'textoInformativo';
  }

  /**
   * Al actualizar un campo que es dependencias de la visibilidad de otros campos,
   * se realiza una comprobacion de valores, si el valor del cual dependia el campo
   * desaparecio, se elimina la dependencia, sino queda como está
   *
   * @param clave clave del campo que se esta actualizando
   */
  actualizarDependencias(clave: string) {
    const valores = this.campos[clave].modelo.datosGenerales['valores'];
    if (!valores) { return; }

    const clavesCamposDependientes = Object.keys(this.campos).filter((key: string) =>
      this.campos[key].modelo.visibilidad['dependencia'] === clave ||
      this.campos[key].modelo.visibilidad['dependenciaValores'] === clave);

    clavesCamposDependientes.forEach(key => {
      const modelo = this.campos[key].modelo;

      if (modelo.visibilidad['dependencia'] && valores.indexOf(modelo.visibilidad['valor']) === -1) {
        // el valor del campo del que depende se eliminó, por ende eliminamos la dependencia
        delete modelo.visibilidad['dependencia'];
        delete modelo.visibilidad['valor'];
      }
      if (modelo.visibilidad['dependenciaValores']) {
        const mapa = modelo.visibilidad['mapaDependenciaValores'];
        for (const valorDependencia in mapa) {
          if (mapa.hasOwnProperty(valorDependencia)) {
            if (valores.indexOf(valorDependencia) === -1) {
              // se eliminó el valor del campo del cual dependía, eliminamos la dependencia
              delete mapa[valorDependencia];
            }
          }
        }
        if (Object.keys(mapa).length === 0) {
          delete modelo.visibilidad['dependenciaValores'];
          delete modelo.visibilidad['mapaDependenciaValores'];
        }
      }
    });
  }

  esCampoSubsanable(clave: string): boolean {
    if (!this.campos[clave]) {
      return false;
    }
    return this.campos[clave].modelo.esSubsanable;
  }

  esCampoEditableOperador(clave: string): boolean {
    if (!this.campos[clave]) {
      return false;
    }
    return this.campos[clave].modelo.esEditableOperador;
  }

  tieneConceptosAsociados(clave: string): boolean {
    if (!this.campos[clave]) {
      return false;
    }
    const conceptos = this.campos[clave].modelo.conceptos;
    if (!conceptos) {
      return false;
    }
    return conceptos.tieneConceptosPagoAsociados;
  }

  obtenerConceptosVariablesDeLosCampos(): any {
   let conceptos = [];
    const claves = Object.keys(this.campos);
    for (let i = 0; i < claves.length; i++) {
      const conceptosDelCampo = this.campos[claves[i]].modelo.conceptos;
      if (conceptosDelCampo != null && conceptosDelCampo.tieneConceptosPagoAsociados) {
        conceptos = conceptos.concat(conceptosDelCampo.itemsConceptosPago.filter(it => Boolean(it.conceptoPago)).map(item => {
          return item.conceptoPago;
        }));
      }
    }
    //return Array.from(new Set<ConceptoDePago>(conceptos));
    return null
  }

  obtenerValidadoresDeLosCampos(): ValidadorFormulario[] {
    const validadores: ValidadorFormulario[] = [];
    const claves = Object.keys(this.campos);
    for (let i = 0; i < claves.length; i++) {
      const claveCampo = claves[i];
      const validadoresDelCampo = this.campos[claveCampo].modelo.validadores;
      if (validadoresDelCampo.validarConRenaper) {
        validadores.push({
          claveCampo,
          validador: 'model.validador.renaper'
        });
      }
    }
    return validadores;
  }
}
