import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment';

const formatoFechas = 'DD-MM-YYYY';

export function InputFechaFueraDeRangoMensajeValidacion(err, field: FormlyFieldConfig) {
  const { fechaDesde, fechaHasta } = field.templateOptions;
  return `La fecha debe estar entre ${moment(fechaDesde).format(formatoFechas)} y ${moment(fechaHasta).format(formatoFechas)}`;
}

export function InputFechaAnteriorAFechaDesdeMensajeValidacion(err, field: FormlyFieldConfig) {
  const { fechaDesde } = field.templateOptions;
  let fechaModificada;
  switch (fechaDesde.unidad) {
    case 'Días':
      fechaModificada = moment(new Date()).add(fechaDesde.cantidad, 'day');
      break;
    case 'Meses':
      fechaModificada = moment(new Date()).add(fechaDesde.cantidad, 'month');
      break;
    case 'Años':
      fechaModificada = moment(new Date()).add(fechaDesde.cantidad, 'year');
      break;
  }
  return `Fecha mínima permitida: ${moment(fechaModificada).format(formatoFechas)}`;
}

export function InputFechaPosteriorAFechaHastaMensajeValidacion(err, field: FormlyFieldConfig) {
  const { fechaHasta } = field.templateOptions;
  let fechaModificada;
  switch (fechaHasta.unidad) {
    case 'Días':
      fechaModificada = moment(new Date()).add(fechaHasta.cantidad, 'day');
      break;
    case 'Meses':
      fechaModificada = moment(new Date()).add(fechaHasta.cantidad, 'month');
      break;
    case 'Años':
      fechaModificada = moment(new Date()).add(fechaHasta.cantidad, 'year');
      break;
  }
  return `Fecha máxima permitida: ${moment(fechaModificada).format(formatoFechas)}`;
}

export function InputFechaPosteriorAFechaActualMensajeValidacion(err, field: FormlyFieldConfig) {
  return `La fecha debe ser anterior o igual a la fecha actual`;
}
