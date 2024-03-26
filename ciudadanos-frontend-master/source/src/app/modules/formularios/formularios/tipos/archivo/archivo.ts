import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';

export interface ArchivoConfigFormly {
  key: string;
  type: string;
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    archivoNuevo: boolean;
    descripcion?: string;
    extensiones?: string[];
    mensajeError?: string;
    tamañoMaximoEnMB?: number;
    seMuestraEnGrilla?: boolean;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
  };
  validation?: any;
  subsanable: boolean;
  editableOperador: boolean;
}

export class Archivo extends ModeloCampoFormulario {
  tipo = 'archivo';
  override conceptos = null;

  constructor() {
    super();
  }

  get configuracionFormly(): ArchivoConfigFormly {
    const key = (this._configuracionFormly) ? this._configuracionFormly.key : ModeloCampoFormulario.getFormlyKey(this.nombre);
    return {
      key: key as string,
      type: 'input-file',
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        label: this.etiqueta,
        required: this.esObligatorio,
        archivoNuevo: this.esArchivoNuevo,
        descripcion: this.datosGenerales['descripcion'],
        extensiones: this.extensionesPermitidas,
        mensajeError: (this.extensionesPermitidas) ? 'Las extensiones válidas son ' + this.extensionesPermitidas.join(' ') : '',
        tamañoMaximoEnMB: this.validaciones['tamanioMaximo'],
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        condicionesOcultar: this.condicionesAOCultar
      }
    };
  }

  setConfiguracionFormly(config: ArchivoConfigFormly): void {
    this._configuracionFormly = config;
    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      descripcion: config.templateOptions.descripcion,
      esArchivoNuevo: config.templateOptions.archivoNuevo,
      esSubsanable: config.subsanable,
      esEditableOperador: config.editableOperador,
      seMuestraEnGrilla: config.templateOptions.seMuestraEnGrilla,
    };

    this.validaciones = {
      campoObligatorio: config.templateOptions.required,
      extensionesPermitidas: (config.templateOptions.extensiones || []).map(valor => {
        return {
          display: valor,
          value: valor
        };
      }),
      tamanioMaximo: config.templateOptions.tamañoMaximoEnMB,
    };

    if (config.templateOptions.condicionesOcultar) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }
  }

  get extensionesPermitidas() {
    if (!this.validaciones['extensionesPermitidas'] || (this.validaciones['extensionesPermitidas'] && !this.validaciones['extensionesPermitidas'].length)) {
      return null;
    }
    return this.validaciones['extensionesPermitidas'].map(ext => ext.value);
  }
}
