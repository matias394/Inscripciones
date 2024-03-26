import { ModeloCampoFormulario, ConceptosPagoCampoFormulario } from '../../modelos/modelo-campo-formulario';
import _ from "underscore";




interface OptionsListaDesplegable {
  descripcion: string;
  valorEntidadDependencia?: string;
}

export interface ListaDesplegableConfigFormly {
  key: string;
  type: string;
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    claveEntidadDependencia: string;
    opciones: OptionsListaDesplegable[];
    placeholder?: string;
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

export class ListaDesplegable extends ModeloCampoFormulario {

  tipo = '';
  LISTA_DESPLEGABLE_SIMPLE_TYPE = 'listaDesplegable';
  LISTA_DESPLEGABLE_FILTRO_TYPE = 'listaDesplegableFiltro';
  LISTA_DESPLEGABLE_SIMPLE_FORMLY = 'input-select';
  LISTA_DESPLEGABLE_SIMPLE_CON_DEPENDENCIA_FORMLY = 'select-con-dependencia';
  LISTA_DESPLEGABLE_FILTRO_FORMLY = 'select-con-filtro';

  get configuracionFormly(): ListaDesplegableConfigFormly {
    return {
      key: this.key,
      type: this.type,
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        label: this.etiqueta,
        placeholder: this.datosGenerales['texto'],
        defaultValue: this.datosGenerales['valorPorDefecto'],
        required: this.esObligatorio,
        descripcion: this.datosGenerales['descripcion'],
        seMuestraEnGrilla: this.datosGenerales['seMuestraEnGrilla'],
        opciones: this.options,
        claveEntidadDependencia: this.dependenciaValores,
        condicionesOcultar: this.condicionesAOCultar,
      }
    };
  }


  setConfiguracionFormly(config: ListaDesplegableConfigFormly): void {
    this._configuracionFormly = config;
    this.tipo = (config.type === this.LISTA_DESPLEGABLE_FILTRO_FORMLY) ? this.LISTA_DESPLEGABLE_FILTRO_TYPE : this.LISTA_DESPLEGABLE_SIMPLE_TYPE;
    const valores = _.uniq(config.templateOptions['opciones'].map(val => val.descripcion));

    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      texto: config.templateOptions.placeholder,
      descripcion: config.templateOptions.descripcion,
      valores,
      esSubsanable: config.subsanable,
      esEditableOperador: config.editableOperador,
      seMuestraEnGrilla: config.templateOptions.seMuestraEnGrilla,
      valorPorDefecto: config.templateOptions.defaultValue,
    };

    this.validaciones = {
      campoObligatorio: config.templateOptions.required,
    };

    if (config.templateOptions.condicionesOcultar && config.templateOptions.condicionesOcultar.length) {
      this.visibilidad = {
        dependencia: config.templateOptions.condicionesOcultar[0].entidad,
        valores: config.templateOptions.condicionesOcultar.map(condicion => condicion.valor)
      };
    }

    if (config.templateOptions.claveEntidadDependencia) {
      this.visibilidad = Object.assign((this.visibilidad || {}), {
        dependenciaValores: config.templateOptions.claveEntidadDependencia,
        mapaDependenciaValores: this.crearMapaDependenciaValores(config.templateOptions['opciones'])
      });
    }
  }

  override get descripcion() {
    return this.datosGenerales['descripcion'];
  }

  get placeholder() {
    if (this.datosGenerales['valorPorDefecto']) {
      return this.datosGenerales['valorPorDefecto'];
    }
    return this.datosGenerales['texto'] || '';
  }

  // @ts-ignore
  get type() {
    if (this.tipo === this.LISTA_DESPLEGABLE_FILTRO_TYPE) {
      return this.LISTA_DESPLEGABLE_FILTRO_FORMLY;
    }
    if (this.tipo === this.LISTA_DESPLEGABLE_SIMPLE_TYPE) {
      return this.dependenciaValores ? 'select-con-dependencia' : 'input-select';
    }
  }

  get dependenciaValores() {
    return this.visibilidad['dependenciaValores'];
  }

  get mapaDependenciaValores() {
    return this.visibilidad['mapaDependenciaValores'];
  }

  override get esObligatorio() {
    return Boolean(this.validaciones['campoObligatorio']);
  }

  get options() {
    let valores = [];

    if (this.dependenciaValores) {
      for (const valorEntidadDependencia in this.mapaDependenciaValores) {
        if (this.mapaDependenciaValores.hasOwnProperty(valorEntidadDependencia)) {
          (this.mapaDependenciaValores[valorEntidadDependencia] || []).map(descripcion => {
            valores.push({
              descripcion,
              valorEntidadDependencia
            });
          });
        }
      }
    } else {
      valores = this.datosGenerales['valores'].map(valor => {
        return {
          descripcion: valor
        };
      });
    }

    return valores;
  }

  crearMapaDependenciaValores(options: OptionsListaDesplegable[]) {
    const mapa = {};
/*    _.chain(options).groupBy('valorEntidadDependencia')
      .map((opcion, valorDependencia) => {
        mapa[valorDependencia] = opcion.map(o => o.descripcion);
      }).value();*/

    return mapa;
  }

}
