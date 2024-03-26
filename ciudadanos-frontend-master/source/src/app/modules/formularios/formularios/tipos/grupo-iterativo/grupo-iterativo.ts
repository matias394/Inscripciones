import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { TextoInformativo } from '../texto-informativo/texto-informativo';
import { removeNullOrUndefined } from '../../funciones/remove-null-or-undefined';
import { Subject } from 'rxjs';

interface GrupoIterativoConfigFormly {
  key: string;
  type: 'grupo-iterativo';
  name: string;
  templateOptions: {
    label: string;
    required: boolean;
    camposFormulario: FormlyFieldConfig[];
    defaultValue?: string;
    descripcion?: string;
    condicionesOcultar?: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
  };
  subsanable: boolean;
  editableOperador: boolean;
}

export class GrupoIterativo extends ModeloCampoFormulario {
  tipo = 'grupoIterativo';
  campos: ModeloCampoFormulario[] = [];
  override conceptos = null;

  protected actualizarCamposEnGrillaSubject = new Subject<boolean>();

  constructor() {
    super();
  }

  get configuracionFormly(): GrupoIterativoConfigFormly {
    const formlyConfig: GrupoIterativoConfigFormly = {
      key: this.key,
      type: 'grupo-iterativo',
      name: this.nombre,
      subsanable: this.esSubsanable,
      editableOperador: this.esEditableOperador,
      templateOptions: {
        label: this.etiqueta,
        defaultValue: this.datosGenerales['valorPorDefecto'],
        camposFormulario: [],
        required: this.esObligatorio,
        descripcion: this.datosGenerales['descripcion'],
        condicionesOcultar: this.condicionesAOCultar
      },
    };
    if (this.campos && this.campos.length !== 0) {
      formlyConfig.templateOptions.camposFormulario = this.obtenerConfiguracionFormlyCampos();
    } else {
      formlyConfig.templateOptions.camposFormulario = this._configuracionFormly ? this._configuracionFormly.templateOptions['camposFormulario'] : [];
    }
    return formlyConfig;
  }

  setConfiguracionFormly(config: GrupoIterativoConfigFormly): void {
    this._configuracionFormly = config;

    this.datosGenerales = {
      nombre: config.name,
      etiqueta: config.templateOptions.label,
      descripcion: config.templateOptions.descripcion,
      esSubsanable: config.subsanable,
      esEditableOperador: config.editableOperador
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
  }

  contieneCampo(clave: string): boolean {
    const filtered = this.campos.filter((val) => val.key === clave);
    return filtered.length !== 0;
  }

  addCampo(campo: ModeloCampoFormulario, clave?: string) {
    // @ts-ignore
    campo.grupoIterativo = this;
    if (!this.contieneCampo(campo.key)) {
      if (!clave) {
        this.campos.push(campo);
      } else {
        const index = this.campos.map(val => val.key).indexOf(clave);

        if (index === -1) {
          // la clave no existe en el grupo iterativo
          this.campos.push(campo);
        } else {
          // insertamos despues del componente
          this.campos.splice(index + 1, 0, campo);
        }
      }
    }
    return this;
  }

  removeCampo(campo: ModeloCampoFormulario) {
    const index = this.campos.indexOf(campo);
    if (index !== -1) {
      this.campos.splice(index, 1);
    }
    return this;
  }

  actualizarCamposEnGrilla() {
    this.actualizarCamposEnGrillaSubject.next(true);
  }

  cambiosEnLaGrilla() {
    return this.actualizarCamposEnGrillaSubject.asObservable();
  }

  camposEnGrilla(): ModeloCampoFormulario[] {
    return this.campos.filter(campo => campo.seMuestraEnGrilla);
  }

  /**
   * Chequea que campos se pueden mostrar en la grilla
   */
  chequearGrilla(): void {
    const camposEnGrilla = this.camposEnGrilla();

    this.campos.forEach((campo) => {
      // el campo se puede mostrar en la grilla solo si la grilla tiene menos de 3 campos
      // o si el campo actual es uno de los 3 que se esta mostrando en la grilla
      campo.sePuedeMostrarEnGrilla = camposEnGrilla.indexOf(campo) !== -1 || camposEnGrilla.length < 3;
    });
  }

  /**
   * Obtiene la configuracion formly de los campos hijos
   */
  obtenerConfiguracionFormlyCampos() {
    return this.campos.reduce((formlyCampos, campo) => {
      const formlyCampo = campo.configuracionFormly;
      if (!(campo instanceof TextoInformativo)) {
        formlyCampo.templateOptions['seMuestraEnGrilla'] = campo.datosGenerales['seMuestraEnGrilla'] || false;
      }

      // si tiene un template lo cargamos
      if (campo.configuracionFormlyTemplate) {
        formlyCampos.push(removeNullOrUndefined(campo.configuracionFormlyTemplate));
      }
      formlyCampos.push(removeNullOrUndefined(formlyCampo));
      return formlyCampos;
    }, []);
  }

  contieneCamposHijos(): boolean {
    return this.campos.length > 0;
  }

  contieneAlMenosUnHijoImportante(): boolean {
    return this.campos.some(c => c.seMuestraEnGrilla);
  }
}
