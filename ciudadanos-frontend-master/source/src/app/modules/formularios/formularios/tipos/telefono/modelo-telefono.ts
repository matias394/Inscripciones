import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TextoConfigFormly } from '../texto/texto';


interface TelefonoConfigFormly {
  key: string;
  name: string;
  fieldGroupClassName: string;
  fieldGroup: TextoConfigFormly[];
  subsanable: boolean;
  esAgrupador: boolean;
  templateOptions: {
    required: boolean;
    descripcion?: string;
    label?: string;
    valorMiba?: string;
    seMuestraEnGrilla?: boolean;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
  };
}

export class ModeloTelefono extends ModeloCampoFormulario {
  tipo = 'telefono';
  override datosGenerales = {
    nombre: '',
    etiqueta: '',
    descripcion: '',
    integracionMiba: false,
    esSubsanable: false,
    seMuestraEnGrilla: false,
    valorMiba: ''
  };
  override validaciones = {
    campoObligatorio: false
  };
  override visibilidad = {};
  override conceptos = null;

  constructor() {
    super();
  }

  get configuracionFormly(): any {
    const condicionesOcultar = this.condicionesAOCultar;

    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : ModeloCampoFormulario.getFormlyKey(this.nombre);

    return {
      key: formlyKey,
      type: 'input-telefono',
      templateOptions: {
        descripcion: this.datosGenerales.descripcion,
        label: this.datosGenerales.etiqueta,
        required: this.esObligatorio,
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        valorMiba: this.datosGenerales.valorMiba,
        condicionesOcultar
      },
      name: this.datosGenerales.nombre,
      subsanable: this.datosGenerales.esSubsanable
    };
  }

  setConfiguracionFormly(config: TelefonoConfigFormly | FormlyFieldConfig) {
    this._configuracionFormly = config as FormlyFieldConfig;

    config = <TelefonoConfigFormly>config;
    this.datosGenerales.seMuestraEnGrilla = config.templateOptions.seMuestraEnGrilla;
    this.datosGenerales.nombre = config.name;
    this.datosGenerales.esSubsanable = config.subsanable;
    this.datosGenerales.descripcion = config.templateOptions.descripcion;
    this.datosGenerales.etiqueta = config.templateOptions.label;
    this.validaciones.campoObligatorio = Boolean(config.templateOptions.required);

    if (config.templateOptions.valorMiba) {
      this.datosGenerales.integracionMiba = true;
      this.datosGenerales.valorMiba = config.templateOptions.valorMiba;
    }

    if (config.templateOptions.condicionesOcultar && config.templateOptions.condicionesOcultar.length) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }

  override get esObligatorio() {
    return Boolean(this.validaciones['campoObligatorio']);
  }
}
