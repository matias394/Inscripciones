import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidadorCampoFormulario } from '../../modelos/validador-campo-formulario';
interface DireccionUsigConfigFormly {
  key: string;
  type: string;
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    placeholder?: string;
    descripcion?: string;
    seMuestraEnGrilla?: boolean;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
    validadores: ValidadorCampoFormulario;
  };
  subsanable: boolean;
  editableOperador: boolean;
}
export class DireccionUsig extends ModeloCampoFormulario {
  tipo = 'direccionUsig';
  override datosGenerales = {};
  override validaciones = {};
  override visibilidad = {};

  protected override _configuracionFormly: FormlyFieldConfig;

  constructor() {
    super();
  }

  get placeholder() {
    return this.datosGenerales['texto'];
  }

  setConfiguracionFormly(conf: DireccionUsigConfigFormly): void {
    this._configuracionFormly = conf as FormlyFieldConfig;

    const config: DireccionUsigConfigFormly = conf as DireccionUsigConfigFormly;
    this.datosGenerales['nombre'] = config.name;
    this.datosGenerales['etiqueta'] = config.templateOptions.label;
    this.validaciones['campoObligatorio'] = config.templateOptions.required;
    this.datosGenerales['texto'] = config.templateOptions.placeholder;
    this.datosGenerales['esSubsanable'] = config.subsanable;
    this.datosGenerales['esEditableOperador'] = config.editableOperador;
    this.datosGenerales['seMuestraEnGrilla'] = config.templateOptions.seMuestraEnGrilla;
    if (config.templateOptions.descripcion) {
      this.datosGenerales['descripcion'] = config.templateOptions.descripcion;
    }
    this.validadores = conf.templateOptions.validadores;
    if (config.templateOptions.condicionesOcultar && config.templateOptions.condicionesOcultar.length) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }

  get configuracionFormly(): DireccionUsigConfigFormly {
    // si el campo se está editando no se genera una nueva clave
    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : DireccionUsig.getFormlyKey(this.nombre);
    const direccionFormly: DireccionUsigConfigFormly = {
      key: formlyKey,
      type: 'calle-usig',
      name: this.nombre,
      templateOptions: {
        label: this.etiqueta,
        required: this.esObligatorio,
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        validadores: this.validadores
      },
      validators: {
        validation: [
          'calle-usig'
        ]
      },
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador
    } as DireccionUsigConfigFormly;
    direccionFormly.templateOptions.condicionesOcultar = this.condicionesAOCultar;
    if (this.placeholder) { direccionFormly.templateOptions.placeholder = this.placeholder; }
    if (this.descripcion) { direccionFormly.templateOptions.descripcion = this.descripcion; }
    return direccionFormly;
  }

}
