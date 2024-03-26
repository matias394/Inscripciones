import { Type } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModeloCampoFormulario } from '../modelos/modelo-campo-formulario';
import { TextoInformativo } from './texto-informativo/texto-informativo';
import { ModeloTelefono } from './telefono/modelo-telefono';
import { Archivo } from './archivo/archivo';
import { DireccionUsig } from './direccion-usig/direccion-usig';
import { Texto } from './texto/texto';
import { Fecha } from './fecha/fecha';
import { GrupoIterativo } from './grupo-iterativo/grupo-iterativo';
import { SelectorExcluyente } from './selector-excluyente/selector-excluyente';
import { SelectorMultiple } from './selector-multiple/selector-multiple';
import { CuitRazonSocial } from './cuit-razonsocial/cuit-razonsocial';
import { ListaDesplegable } from './lista-desplegable/lista-desplegable';
import { DireccionCaba } from './direccion-caba/direccion-caba';

interface TraduccionFormlyModeloCampoFormulario {
  [type: string]: Type<ModeloCampoFormulario>;
}

const traduccionFormlyModeloCampoFormulario: TraduccionFormlyModeloCampoFormulario = {
  'input-simple': Texto,
  'input-titulo': TextoInformativo,
  'textbox-simple': Texto,
  'input-texto-informativo': TextoInformativo,
  'input-telefono': ModeloTelefono,
  'calle-usig': DireccionUsig,
  'input-file': Archivo,
  'input-fecha': Fecha,
  'grupo-iterativo': GrupoIterativo,
  'input-radio': SelectorExcluyente,
  'selector-multiple': SelectorMultiple,
  'cuit-razonsocial': CuitRazonSocial,
  'input-select': ListaDesplegable,
  'select-con-filtro': ListaDesplegable,
  'select-con-dependencia': ListaDesplegable,
  'direccion-caba': DireccionCaba,

};

function factory<T>(type: { new(): T }): T {
  return new type();
}

export function modeloCampoFormularioFactory(config: FormlyFieldConfig): ModeloCampoFormulario {
  const tipo = config.type ? config.type : config['tipo'];
  if (!tipo) { return null; }
  if (!traduccionFormlyModeloCampoFormulario[tipo]) {
    throw new Error(`La traduccion de formly para el tipo "${tipo}" no está definida`);
  }
  const instancia = factory(traduccionFormlyModeloCampoFormulario[tipo]);
  instancia.setConfiguracionFormly(config);
  return instancia;
}
