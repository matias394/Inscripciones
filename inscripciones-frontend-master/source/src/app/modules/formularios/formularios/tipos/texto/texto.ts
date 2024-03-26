import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {CAMPOS_MIBA} from "./campos-miba";
//import { CAMPOS_MIBA } from './campos-miba';

export interface TextoConfigFormly {
  key: string;
  type: string;
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    placeholder?: string;
    defaultValue?: string;
    description?: string;
    mibaKey?: string;
    editable?: boolean;
    pattern?: string;
    minLength?: string;
    maxLength?: string;
    seMuestraEnGrilla?: boolean;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
  };

  validation?: any;
  subsanable: string;
  editableOperador: boolean;
}
export class Texto extends ModeloCampoFormulario {
  tipo = '';
  override datosGenerales = {};
  override validaciones = {};
  override visibilidad = {
    dependencia: null,
    valores: [],
  };

  protected override _configuracionFormly: FormlyFieldConfig;
  TEXTO_CORTO_TYPE = 'textoCorto';
  TEXTO_LARGO_TYPE = 'textoLargo';
  TEXTO_CORTO_FORMLY = 'input-simple';
  TEXTO_LARGO_FORMLY = 'textbox-simple';

  constructor() {
    super();
  }

  get placeholder() {
    return this.datosGenerales['texto'];
  }

  override get  esSubsanable() {
    return this.datosGenerales['esSubsanable'];
  }

  override get esEditableOperador() {
    return this.datosGenerales['esEditableOperador'];
  }

  get esMibaProperty() {
    return this.datosGenerales['integracionMiba'];
  }

  get valorMibaKey() {
    return this.datosGenerales['valorMiba'] ? this.datosGenerales['valorMiba'].valor : null;
  }

  get valorMibaEditable() {
    return this.datosGenerales['valorMiba'] ? this.datosGenerales['valorMiba'].editable : null;
  }

  get longitudMinima() {
    return (this.validaciones['longitudMinima']) ? this.validaciones['longitudMinima'] : null;
  }

  get longitudMaxima() {
    return (this.validaciones['longitudMaxima']) ? this.validaciones['longitudMaxima'] : null;
  }

  get regex() {
    return this.validaciones['expresionRegular'];
  }

  get mensajeRegex() {
    return this.validaciones['mensajeError'];
  }

  get valorPorDefecto() {
    return this.datosGenerales['valorPorDefecto'];
  }

  setConfiguracionFormly(conf: TextoConfigFormly | FormlyFieldConfig): void {
    this._configuracionFormly = conf as FormlyFieldConfig;

    const config: TextoConfigFormly = conf as TextoConfigFormly;
    this.tipo = (config.type === this.TEXTO_CORTO_FORMLY) ? this.TEXTO_CORTO_TYPE : this.TEXTO_LARGO_TYPE;
    this.datosGenerales['nombre'] = config.name;
    this.datosGenerales['etiqueta'] = config.templateOptions.label;
    this.datosGenerales['texto'] = config.templateOptions.placeholder;
    this.datosGenerales['valorPorDefecto'] = config.templateOptions.defaultValue;
    this.validaciones['campoObligatorio'] = config.templateOptions.required;
    this.datosGenerales['esSubsanable'] = config.subsanable;
    this.datosGenerales['esEditableOperador'] = config.editableOperador;
    this.datosGenerales['seMuestraEnGrilla'] = config.templateOptions.seMuestraEnGrilla;
    if (config.templateOptions.description) { this.datosGenerales['descripcion'] = config.templateOptions.description; }
    if (config.templateOptions.mibaKey) {
      this.datosGenerales['integracionMiba'] = true;
      this.datosGenerales['valorMiba'] = CAMPOS_MIBA.find(c => c.valor === config.templateOptions.mibaKey);
    } else {
      if (config.templateOptions) {
        this.validaciones['expresionRegular'] = config.templateOptions.pattern;
        this.validaciones['longitudMaxima'] = config.templateOptions.maxLength;
        this.validaciones['longitudMinima'] = config.templateOptions.minLength;
      }
      if (config.validation && config.validation.messages) {
        this.validaciones['mensajeError'] = config.validation.messages.pattern;
      }
    }
    if (config.templateOptions.condicionesOcultar && config.templateOptions.condicionesOcultar.length) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }

  get configuracionFormly(): any | FormlyFieldConfig {
    // si el campo se está editando no se genera una nueva clave
    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : Texto.getFormlyKey(this.nombre);
    const textoFormly: TextoConfigFormly = {
      key: formlyKey,
      type: (this.tipo === this.TEXTO_CORTO_TYPE) ? this.TEXTO_CORTO_FORMLY : this.TEXTO_LARGO_FORMLY,
      name: this.nombre,
      templateOptions: {
        label: this.etiqueta,
        required: this.esObligatorio,
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla']
      },
      subsanable: this.esSubsanable,
      editableOperador:this.esEditableOperador
    } as TextoConfigFormly;
    textoFormly.templateOptions.condicionesOcultar = this.condicionesAOCultar;
    if (this.placeholder) { textoFormly.templateOptions.placeholder = this.placeholder; }
    if (this.valorPorDefecto) { textoFormly.templateOptions.defaultValue = this.valorPorDefecto; }
    if (this.descripcion) { textoFormly.templateOptions.description = this.descripcion; }
    if (this.esMibaProperty) {
      textoFormly.templateOptions.mibaKey = this.valorMibaKey;
      textoFormly.templateOptions.editable = this.valorMibaEditable;
    } else {
      textoFormly.templateOptions.pattern = this.regex;
      textoFormly.validation = {
        messages: {
          pattern: this.mensajeRegex
        }
      };
      textoFormly.templateOptions.maxLength = this.longitudMaxima;
      textoFormly.templateOptions.minLength = this.longitudMinima;
    }
    return textoFormly;
  }

}
