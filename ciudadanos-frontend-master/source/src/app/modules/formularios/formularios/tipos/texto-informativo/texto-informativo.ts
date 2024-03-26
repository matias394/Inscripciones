import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';

export const FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO = {
  titulo: 'Título',
  subtitulo: 'Subtítulo',
  texto: 'Texto',
  aclaracion: 'Aclaración',
};

interface TextoInformativoConfigFormly {
  key: string;
  type: 'input-titulo' | 'input-texto-informativo';
  templateOptions: {
    titulo: string;
    tipo: string;
    condicionesOcultar: {
      entidad: string;
      operador: string;
      valor: string;
    }[];
  };
}

export class TextoInformativo extends ModeloCampoFormulario {
  tipo = 'textoInformativo';
  override datosGenerales = {
    formato: '',
    descripcion: '',
  };
  override validaciones = null;
  override visibilidad = {};
  override conceptos = null;

  static override getFormlyKey(name: string): string {
    return `${ModeloCampoFormulario.getFormlyKey(
      name.split(' ')[0]
    )}_${Date.now()}`;
  }

  constructor() {
    super();
  }

  setConfiguracionFormly(config: FormlyFieldConfig) {
    this._configuracionFormly = config;

    let formato: string;
    switch (config.templateOptions['tipo']) {
      case 'h1':
        formato = FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.titulo;
        break;
      case 'h3':
        formato = FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.subtitulo;
        break;
      case 'p':
        formato = FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.texto;
        break;
      case 'small':
        formato = FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.aclaracion;
        break;
    }

    this.datosGenerales = {
      formato: formato,
      descripcion: config.templateOptions['titulo'] ? config.templateOptions['titulo'] : config.templateOptions['textoHTML'],
    };
    this.validaciones = null;

    if (config.templateOptions['condicionesOcultar'] && config.templateOptions['condicionesOcultar'].length) {
      this.visibilidad = {
        dependencia: config.templateOptions['condicionesOcultar'][0].entidad,
        valores: config.templateOptions['condicionesOcultar'].map(condicion => condicion.valor)
      };
    }

  }

  get configuracionFormly(): TextoInformativoConfigFormly | FormlyFieldConfig {
    let htmlTag: string, formlyType: 'input-titulo' | 'input-texto-informativo';
    switch (this.datosGenerales.formato) {
      case FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.titulo:
        htmlTag = 'h1';
        formlyType = 'input-titulo';
        break;
      case FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.subtitulo:
        htmlTag = 'h3';
        formlyType = 'input-titulo';
        break;
      case FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.texto:
        htmlTag = 'p';
        formlyType = 'input-titulo';
        break;
      case FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.aclaracion:
        htmlTag = 'small';
        formlyType = 'input-texto-informativo';
        break;
    }

    return {
      key: this.key,
      type: formlyType,
      templateOptions: {
        titulo: (formlyType !== 'input-texto-informativo') ? this.datosGenerales.descripcion : null,
        textoHTML: (formlyType === 'input-texto-informativo') ? this.datosGenerales.descripcion : null,
        tipo: htmlTag,
        condicionesOcultar: this.condicionesAOCultar
      }
    };
  }

  override get key() {
    if (!this._key) {
      this._key = this._configuracionFormly ?
        this._configuracionFormly.key as string
        : TextoInformativo.getFormlyKey(this.datosGenerales.descripcion);
    }
    return this._key;
  }

  get formato() {
    return this.datosGenerales['formato'];
  }

  override get descripcion() {
    return this.datosGenerales['descripcion'];
  }

}
