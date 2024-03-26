import { ModeloCampoFormulario, ConceptosPagoCampoFormulario } from '../../modelos/modelo-campo-formulario';



export interface SelectorExcluyenteConfigFormly {
  key: string;
  type: 'input-radio';
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    opciones: {
      label: string;
      value: string;
    }[];
    defaultValue?: string;
    descripcion?: string;
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

export class SelectorExcluyente extends ModeloCampoFormulario {

  tipo = 'selectorExcluyente';

  get configuracionFormly(): SelectorExcluyenteConfigFormly {
    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : SelectorExcluyente.getFormlyKey(this.datosGenerales['nombre']);
    return {
      key: formlyKey as string,
      type: 'input-radio',
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        label: this.etiqueta,
        defaultValue: this.valorPorDefecto,
        opciones: this.valoresFrmly,
        required: this.esObligatorio,
        descripcion: this.descripcion,
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        condicionesOcultar: this.condicionesAOCultar,
      }
    };
  }

  setConfiguracionFormly(config: SelectorExcluyenteConfigFormly): void {
    this._configuracionFormly = config;
    const opciones = (config.templateOptions.opciones || []).map(v => v.value);
    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      descripcion: config.templateOptions.descripcion,
      valoresPorDefecto: [config.templateOptions.defaultValue],
      valores: opciones,
      esSubsanable: config.subsanable,
      esEditableOperador: config.editableOperador,
      seMuestraEnGrilla: config.templateOptions.seMuestraEnGrilla
    };
    this.validaciones = {
      campoObligatorio: config.templateOptions.required
    };

    if (config.templateOptions.condicionesOcultar && config.templateOptions.condicionesOcultar.length) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }

  }

  get valorPorDefecto() {
    return this.datosGenerales['valoresPorDefecto'] ? this.datosGenerales['valoresPorDefecto'][0] : null;
  }

  get valoresPorDefecto() {
    return this.datosGenerales['valoresPorDefecto'] || [];
  }

  get valores() {
    return this.datosGenerales['valores'];
  }

  get valoresFrmly() {
    return this.valores && this.valores.map(valor => {
      return {
        label: valor,
        value: valor
      };
    });
  }
}
