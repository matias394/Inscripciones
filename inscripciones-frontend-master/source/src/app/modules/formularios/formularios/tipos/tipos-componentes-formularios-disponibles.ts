import { TIPO_COMPONENTE_ARCHIVO } from './archivo/tipo-componente-archivo';
import { TIPO_COMPONENTE_TEXTO_INFORMATIVO } from './texto-informativo/tipo-componente-texto-informativo';
import { ComponentesFormulario } from '../modelos/componentes-formulario';
import { TIPO_COMPONENTE_TEXTO_CORTO } from './texto/tipo-componente-texto-corto';
import { TIPO_COMPONENTE_TEXTO_LARGO } from './texto/tipo-component-texto-largo';
import { TIPO_COMPONENTE_DIRECCION_USIG } from './direccion-usig/tipo-component-direccion-usig';
import { TIPO_COMPONENTE_TELEFONO } from './telefono/tipo-componente-telefono';
import { TIPO_COMPONENTE_GRUPO_ITERATIVO } from './grupo-iterativo/tipo-componente-grupo-iterativo';
import { TIPO_COMPONENTE_FECHA } from './fecha/tipo-componente-fecha';
import { TIPO_COMPONENTE_SELECTOR_EXCLUYENTE } from './selector-excluyente/tipo-componente-selector-excluyente';
import { TIPO_COMPONENTE_SELECTOR_MULTIPLE } from './selector-multiple/tipo-componente-selector-multiple';
import { TIPO_COMPONENTE_CUIT_RAZONSOCIAL } from './cuit-razonsocial/tipo-component-cuit-razonsocial';
import { TIPO_COMPONENTE_LISTA_DESPLEGABLE_SIMPLE } from './lista-desplegable/tipo-componente-lista-desplegable-simple';
import { TIPO_COMPONENTE_LISTA_DESPLEGABLE_FILTRO } from './lista-desplegable/tipo-componente-lista-desplegable-filtro';
import { TIPO_COMPONENTE_DIRECCION_CABA } from './direccion-caba/tipo-componente-direccion-caba';

export const TIPOS_COMPONENTES_FORMULARIOS_DIPONIBLES: ComponentesFormulario = {
  textoInformativo: TIPO_COMPONENTE_TEXTO_INFORMATIVO,
  textoCorto: TIPO_COMPONENTE_TEXTO_CORTO,
  textoLargo: TIPO_COMPONENTE_TEXTO_LARGO,
  archivo: TIPO_COMPONENTE_ARCHIVO,
  direccionUsig: TIPO_COMPONENTE_DIRECCION_USIG,
  telefono: TIPO_COMPONENTE_TELEFONO,
  grupoIterativo: TIPO_COMPONENTE_GRUPO_ITERATIVO,
  fecha: TIPO_COMPONENTE_FECHA,
  listaDesplegable: TIPO_COMPONENTE_LISTA_DESPLEGABLE_SIMPLE,
  listaDesplegableFiltro: TIPO_COMPONENTE_LISTA_DESPLEGABLE_FILTRO,
  selectorExcluyente: TIPO_COMPONENTE_SELECTOR_EXCLUYENTE,
  selectorMultiple: TIPO_COMPONENTE_SELECTOR_MULTIPLE,
  cuitRazonSocial: TIPO_COMPONENTE_CUIT_RAZONSOCIAL,
  direccionCaba: TIPO_COMPONENTE_DIRECCION_CABA,

};
