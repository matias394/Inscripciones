import { GrupoIterativo } from './../tipos/grupo-iterativo/grupo-iterativo';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { ValidadorCampoFormulario } from './validador-campo-formulario';
export interface VisibilidadCampoFormulario {
  dependencia?: string;
  valores?: string[];
  dependenciaValores?: string;
  mapaDependenciaValores?: { [key: string]: string[] };
}

export interface ValidacionesCampoFormulario {
  campoObligatorio?: boolean;
  [key: string]: any;
}

export interface DatosGeneralesCampoFormulario {
  nombre?: string;
  etiqueta?: string;
  esArchivoNuevo?: boolean;
  descripcion?: string;
  esSubsanable?: boolean;
  esDatoImportante?: boolean;
  valoresPorDefecto?: string[];
  [key: string]: any;
}

export interface ConceptosPagoCampoFormulario {
  tieneConceptosPagoAsociados: boolean;
  itemsConceptosPago: {
    valorDelComponente: string;
    conceptoPago: any;
    cantidad: number;
  }[];
}

export abstract class ModeloCampoFormulario {
  protected _key: string;
  protected _configuracionFormly: FormlyFieldConfig;

  protected actualizarVistaCampoSubject = new Subject<ModeloCampoFormulario>();

  datosGenerales: DatosGeneralesCampoFormulario = {};
  validaciones: ValidacionesCampoFormulario = {};
  visibilidad: VisibilidadCampoFormulario = {};
  conceptos: ConceptosPagoCampoFormulario = {
    tieneConceptosPagoAsociados: false,
    itemsConceptosPago: []
  };

  grupoIterativo: GrupoIterativo = null;
  /**
   * El campo se puede mostrar en grilla permanece habilitado
   * solo si el grupo iterativo al que pertenece el modelo tiene menos
   * de 3 campos que se muestran en la grilla o si uno de los 3 campos que
   * se muestran en dicha grilla es el campo actual
   */
  sePuedeMostrarEnGrilla: boolean = false;

  abstract tipo: string;
  abstract readonly configuracionFormly: FormlyFieldConfig;

  public readonly configuracionFormlyTemplate: FormlyFieldConfig;

  /**
   * Normaliza una cadena, elimina caracteres especiales y no alfanumericos,
   * luego reemplaza los espacios por guiones bajos y por ultimo pasa la cadena a minusculas
   */
  static getFormlyKey(name: string): string {
    return name.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/(?![a-z0-9\s]).{1}/gim, '')
      .replace(/\s/g, '_')
      .toLowerCase();
  }

  /**
   * Setea el modelo de cada campo a partir de la configuracion de su formly.
   * @param config configuración formly del campo.
   * @param template configuracion formly del campo template asociado al campo. Se utiliza en los campos agrupadores.
   */
  abstract setConfiguracionFormly(config: FormlyFieldConfig): void;

  actualizarVista() {
    this.actualizarVistaCampoSubject.next(this);
    if (this.grupoIterativo != null) {
      // si el campo pertenece a un grupo iterativo, actualizamos la grilla
      this.grupoIterativo.actualizarCamposEnGrilla();
    }
  }

  cambiosEnVista() {
    return this.actualizarVistaCampoSubject.asObservable();
  }

  get key(): string {
    if (this.nombre && !this._key) {
      this._key = (this._configuracionFormly) ? this._configuracionFormly.key as string : ModeloCampoFormulario.getFormlyKey(this.nombre);
    }
    return this._key;
  }

  get nombre(): string {
    return this.datosGenerales.nombre;
  }

  get etiqueta() {
    return this.datosGenerales.etiqueta;
  }

  get descripcion() {
    return this.datosGenerales.descripcion;
  }

  get esArchivoNuevo(): boolean {
    return this.datosGenerales.esArchivoNuevo || false;
  }

  get esObligatorio() {
    return (this.validaciones && this.validaciones.campoObligatorio) || false;
  }

  get esSubsanable() {
    return this.datosGenerales.esSubsanable || false;
  }

  get esEditableOperador() {
    return this.datosGenerales['esEditableOperador'] || false;
  }

  get seMuestraEnGrilla(): boolean {
    if (!this.datosGenerales.hasOwnProperty('seMuestraEnGrilla')) {
      return false;
    }
    return this.datosGenerales['seMuestraEnGrilla'];
  }

  get condicionesAOCultar() {
    if (!this.visibilidad || !this.visibilidad.dependencia) { return null; }

    return this.visibilidad.valores.map(valor => {
      return {
        entidad: this.visibilidad.dependencia,
        operador: '!==',
        valor: valor
      };
    });
  }

  get validadores(): ValidadorCampoFormulario {
    return {
      validarConRenaper: (this.validaciones && this.validaciones['validarConRenaper']) || false,
    };
  }

  set validadores(validadores: ValidadorCampoFormulario) {
    if (!validadores) {
      return;
    }
    this.validaciones = Object.assign(this.validaciones || {}, validadores);
  }
}
