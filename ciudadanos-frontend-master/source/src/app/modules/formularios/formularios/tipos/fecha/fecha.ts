import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';


export interface FechaConfigFormly {
  key: string;
  type: string;
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    defaultValue?: string;
    description?: string;
    seMuestraEnGrilla?: boolean;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
    fechaDesde?: { cantidad?: number, unidad?: string };
    fechaHasta?: { cantidad?: number, unidad?: string };
    };
  validators?: {
    validation: string[]
  };
  subsanable: boolean;
  editableOperador: boolean;
}

export class Fecha extends ModeloCampoFormulario {
  tipo = 'fecha';
  override conceptos = null;

  get configuracionFormly(): FechaConfigFormly {
    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : Fecha.getFormlyKey(this.datosGenerales['nombre']);
    const formlyObject: FechaConfigFormly = {
      key: formlyKey as string,
      type: 'input-fecha',
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        label: this.etiqueta,
        defaultValue: this.datosGenerales['valorPorDefecto'],
        required: this.esObligatorio,
        description: this.datosGenerales['descripcion'],
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        condicionesOcultar: this.condicionesAOCultar,
        fechaDesde: {},
        fechaHasta: {}
      },
      validators: {
        validation: []
      }
    };
    const validation = [];
    if (this.validaciones['desde']) {
      formlyObject.templateOptions.fechaDesde = {
        cantidad: this.validaciones['desde'],
        unidad: this.validaciones['unidadTiempoMinima']
      };
      validation.push('fecha-anterior-fecha-desde');
    }
    if (this.validaciones['hasta']) {
      formlyObject.templateOptions.fechaHasta = {
        cantidad: this.validaciones['hasta'],
        unidad: this.validaciones['unidadTiempoMinima']
      };
      validation.push('fecha-posterior-fecha-hasta');
    }
    formlyObject.validators.validation = validation;
    return formlyObject;
  }

  setConfiguracionFormly(config: FechaConfigFormly): void {
    this._configuracionFormly = config;
    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      descripcion: config.templateOptions.description,
      esSubsanable: config.subsanable,
      esEditableOperador: config.editableOperador,
      seMuestraEnGrilla: config.templateOptions.seMuestraEnGrilla,
      valorPorDefecto: config.templateOptions.defaultValue,
    };

    if (config.templateOptions) {
      this.validaciones = {
        campoObligatorio: config.templateOptions.required,
        hasta: (config.templateOptions.fechaHasta) ? config.templateOptions.fechaHasta.cantidad : null,
        unidadTiempoMaxima: (config.templateOptions.fechaHasta) ? config.templateOptions.fechaHasta.unidad : null,
        desde: (config.templateOptions.fechaDesde) ? config.templateOptions.fechaDesde.cantidad : null,
        unidadTiempoMinima: (config.templateOptions.fechaDesde) ? config.templateOptions.fechaDesde.unidad : null,
      };
    } else {
      this.validaciones = {};
    }

    if (config.templateOptions.condicionesOcultar) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }

  get valorPorDefecto() {
    return this.datosGenerales['valorPorDefecto'];
  }

}
