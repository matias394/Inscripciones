import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { LOCALIDADES_CABA } from './localidades-caba';

export interface DireccionCabaConfigFormly {
  key: string;
  type: 'direccion-caba';
  name: string;
  templateOptions: {
    label: string;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
    camposDomicilioMiba: any[],
    camposDomicilio: any[]
  };
  subsanable: boolean;
}


export class DireccionCaba extends ModeloCampoFormulario {
  tipo = 'direccionCaba';
  override validaciones = null;
  override conceptos = null;

  get configuracionFormly(): DireccionCabaConfigFormly {
    return {
      key: this.key,
      type: 'direccion-caba',
      name: this.nombre,
      subsanable: this.esSubsanable,
      templateOptions: {
        label: 'Domicilio',
        camposDomicilioMiba: this.camposDomicilioMiba,
        camposDomicilio: this.camposDomicilio,
        condicionesOcultar: this.condicionesAOCultar
      }
    };
  }

  setConfiguracionFormly(config: DireccionCabaConfigFormly): void {
    this._configuracionFormly = config;

    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      esSubsanable: config.subsanable
    };
    this.validaciones = null;
    if (config.templateOptions.condicionesOcultar) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }

  get camposDomicilioMiba(): any[] {
    return [{
      key: 'provincia',
      type: 'input-simple',
      name: 'Provincia',
      templateOptions: {
        label: 'Provincia',
        mibaKey: 'province',
        required: true,
        editable: true,
        inputClass: 'input-miba'
      },
      subsanable: false
    }, {
      key: 'localidad',
      type: 'input-simple',
      name: 'Localidad',
      templateOptions: {
        label: 'Localidad',
        mibaKey: 'location',
        required: true,
        editable: true,
        inputClass: 'input-miba'
      },
      subsanable: true
    }, {
      key: 'calle-altura',
      type: 'input-simple',
      name: 'Calle y altura',
      templateOptions: {
        label: 'Calle y altura',
        mibaKey: 'address',
        required: true,
        editable: true,
        inputClass: 'input-miba'
      },
      subsanable: true
    }, {
      key: 'piso',
      type: 'input-simple',
      name: 'Piso',
      templateOptions: {
        label: 'Piso',
        mibaKey: 'floor',
        editable: true,
        inputClass: 'input-miba'
      },
      subsanable: true
    }, {
      key: 'departamento',
      type: 'input-simple',
      name: 'Depto',
      templateOptions: {
        label: 'Departamento',
        mibaKey: 'department',
        editable: true,
        inputClass: 'input-miba'
      },
      subsanable: true
    }, {
      key: 'cod-postal',
      type: 'input-simple',
      name: 'Codigo postal',
      templateOptions: {
        label: 'Código postal',
        mibaKey: 'postal_code',
        required: true,
        editable: true,
        inputClass: 'input-miba'
      },
      subsanable: true
    }];
  }

  get camposDomicilio() {
    return [{
      key: 'provincia',
      defaultValue: 'Ciudad de Buenos Aires',
      type: 'input-simple',
      name: 'Provincia',
      templateOptions: {
        label: 'Provincia',
        required: true,
        disabled: true
      }
    }, {
      key: 'localidad',
      type: 'select-con-filtro',
      name: 'Localidad',
      templateOptions: {
        label: 'Localidad',
        options: LOCALIDADES_CABA,
        required: true
      }
    }, {
      key: 'calle-altura',
      type: 'calle-usig',
      name: 'Calle y altura',
      templateOptions: {
        label: 'Calle y altura',
        required: true
      },
      validators: {
        validation: [
          'calle-usig'
        ]
      }
    }, {
      key: 'piso',
      type: 'input-simple',
      name: 'Piso',
      templateOptions: {
        label: 'Piso',
        maxLength: 4
      }
    }, {
      key: 'departamento',
      type: 'input-simple',
      name: 'departamento',
      templateOptions: {
        label: 'Departamento',
        maxLength: 20
      }
    }, {
      key: 'cod-postal',
      type: 'input-simple',
      name: 'Codigo postal',
      templateOptions: {
        label: 'Código postal',
        required: true,
        maxLength: 4
      }
    }];
  }
}
