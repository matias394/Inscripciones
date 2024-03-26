import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const REGEX_RAZON_SOCIAL: RegExp = /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ<>|°¬!"#$%&/()=?'\\¡¿¨´+*~\[{^\]}`;,:._\-@]*$/i;

interface CuitRazonSocialConfigFormly {
  key: string;
  type: string;
  name: string;
  templateOptions: {
    labelCuit: 'CUIT';
    labelRazonSocial: 'Razón social';
    required: boolean;
    seMuestraEnGrilla?: boolean;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
  };
  subsanable: boolean;
  editableOperador: boolean;
}


export class CuitRazonSocial extends ModeloCampoFormulario {
  tipo = 'cuitRazonSocial';
  override datosGenerales = {};
  override validaciones = {};
  override visibilidad = {};

  protected override _configuracionFormly: FormlyFieldConfig;

  constructor() {
    super();
    this.datosGenerales['etiqueta'] = 'CUIT y Razón social';
  }

  get nombreCuit(): string {
    return this.datosGenerales['nombre'] + '-cuit';
  }

  get nombreRazonSocial(): string {
    return this.datosGenerales['nombre'] + '-razonSocial';
  }

  get configuracionFormly(): any | FormlyFieldConfig {
    // si el campo se está editando no se genera una nueva clave
    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : CuitRazonSocial.getFormlyKey(this.nombre);

    return {
      key: formlyKey,
      type: 'cuit-razonsocial',
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        labelCuit: 'CUIT',
        labelRazonSocial: 'Razón social',
        label: 'CUIT y Razón social',
        required: this.esObligatorio,
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        condicionesOcultar: this.condicionesAOCultar
      },
      validation: {
        messages: {
          required: '  '
        }
      }
    };
  }

  setConfiguracionFormly(conf: CuitRazonSocialConfigFormly | FormlyFieldConfig): void {
    this._configuracionFormly = conf as FormlyFieldConfig;

    const config: CuitRazonSocialConfigFormly = conf as CuitRazonSocialConfigFormly;
    this.datosGenerales['nombre'] = config.name;
    this.validaciones['campoObligatorio'] = config.templateOptions.required;
    this.datosGenerales['esSubsanable'] = config.subsanable;
    this.datosGenerales['esEditableOperador'] = config.editableOperador;
    this.datosGenerales['seMuestraEnGrilla'] = config.templateOptions.seMuestraEnGrilla;
    if (config.templateOptions.condicionesOcultar && config.templateOptions.condicionesOcultar.length) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }
}
