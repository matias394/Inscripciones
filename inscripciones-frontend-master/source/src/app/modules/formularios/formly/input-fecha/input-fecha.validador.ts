import {FormControl, ValidationErrors} from '@angular/forms';

import {FormlyFieldConfig} from '@ngx-formly/core';
import * as moment from 'moment';

export function InputFechaFueraDeRangoValidador(control: FormControl, field: FormlyFieldConfig): ValidationErrors {
  let fechaOk = true;
  const { fechaDesde, fechaHasta } = field.templateOptions;
  if (control.value && fechaDesde && fechaHasta) {
    fechaOk = moment(control.value).isBetween(fechaDesde, fechaHasta, 'day', '[]');
  }

  return fechaOk ? null : {'fecha-fuera-de-rango': true};
}

export function InputFechaPosteriorAFechaHastaValidador(control: FormControl, field: FormlyFieldConfig): ValidationErrors {
  let fechaOk = true;
  const { fechaHasta } = field.templateOptions;
  let fechaModificada;
  if (control.value && fechaHasta) {
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
    fechaOk = moment(control.value).isSameOrBefore(fechaModificada, 'day');
  }

  return fechaOk ? null : {'fecha-posterior-fecha-hasta': true};
}

export function InputFechaPosteriorAFechaActual(control: FormControl, field: FormlyFieldConfig): ValidationErrors {
  let fechaOk = true;
  if (control.value) {
    fechaOk = moment(control.value).isSameOrBefore(new Date(), 'day');
  }

  return fechaOk ? null : {'fecha-posterior-fecha-actual': true};
}

export function InputFechaAnteriorAFechaDesdeValidador(control: FormControl, field: FormlyFieldConfig): ValidationErrors {
  let fechaOk = true;
  const { fechaDesde } = field.templateOptions;
  let fechaModificada;
  if (control.value && fechaDesde) {
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
    fechaOk = moment(control.value).isSameOrAfter(fechaModificada, 'day');
  }

  return fechaOk ? null : {'fecha-anterior-fecha-desde': true};
}
