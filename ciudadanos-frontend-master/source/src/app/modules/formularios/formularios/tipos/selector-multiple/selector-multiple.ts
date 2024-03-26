import { ModeloCampoFormulario, ConceptosPagoCampoFormulario } from '../../modelos/modelo-campo-formulario';

export interface SelectorMultipleConfigFormly {
  key: string;
  type: 'selector-multiple';
  name: string;
  templateOptions: {
    label: string;
    description?: string;
    required: boolean;
    seMuestraEnGrilla?: boolean;
    options: {
      nombre: string;
      descripcion: string;
      valorPorDefecto: boolean;
    }[];
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
    conceptos?: ConceptosPagoCampoFormulario;
  };
  subsanable: boolean;
  editableOperador: boolean;
}

export class SelectorMultiple extends ModeloCampoFormulario {

  override datosGenerales = {};
  override validaciones = {};
  override visibilidad = {};

  tipo = 'selectorMultiple';

  get configuracionFormly(): SelectorMultipleConfigFormly {
    const formlyKey = this._configuracionFormly
      ? this._configuracionFormly.key
      : SelectorMultiple.getFormlyKey(this.datosGenerales['nombre']);
    return {
      key: formlyKey as string,
      type: 'selector-multiple',
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        label: this.etiqueta,
        options: this.valoresFrmly,
        required: this.esObligatorio,
        description: this.descripcion,
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        condicionesOcultar: this.condicionesAOCultar,
        conceptos: this.conceptos || null
      }
    };
  }

  setConfiguracionFormly(config: SelectorMultipleConfigFormly): void {
    this._configuracionFormly = config;
    const opciones = (config.templateOptions.options || []).map(v => v.descripcion);
    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      descripcion: config.templateOptions.description,
      valoresPorDefecto: (config.templateOptions.options || []).filter(v => v.valorPorDefecto).map(v => v.descripcion),
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

    if (config.templateOptions.conceptos) {
      this.conceptos = config.templateOptions.conceptos;
    }
  }

  override get etiqueta() {
    return this.datosGenerales['etiqueta'];
  }

  override get esObligatorio() {
    return Boolean(this.validaciones['campoObligatorio']);
  }

  override get nombre(): string {
    return this.datosGenerales['nombre'];
  }

  override get descripcion() {
    return this.datosGenerales['descripcion'];
  }

  override get esSubsanable() {
    return this.datosGenerales['esSubsanable'];
  }

  override get esEditableOperador() {
    return this.datosGenerales['esEditableOperador'];
  }

  get valoresPorDefecto() {
    return this.datosGenerales['valoresPorDefecto'] || [];
  }

  get valores() {
    return this.datosGenerales['valores'];
  }

  get valoresFrmly() {
    return this.valores && this.valores.map(valor => {
      const valorPorDefecto = this.valoresPorDefecto.some(vpd => vpd === valor);
      return {
        nombre: SelectorMultiple.getFormlyKey(valor),
        descripcion: valor,
        valorPorDefecto
      };
    });
  }

}
