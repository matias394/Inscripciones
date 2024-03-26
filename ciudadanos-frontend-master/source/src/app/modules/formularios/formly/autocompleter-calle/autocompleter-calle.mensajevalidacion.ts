import { FormlyFieldConfig } from '@ngx-formly/core';

export function AutocompletarMensajeValidacion(err, field: FormlyFieldConfig) {
  return field.model[field.key as string] + ' no es una dirección válida';
}

export function AutocompletarAlturaRequeridaMensajeValidacion(err, field: FormlyFieldConfig) {
  return 'La dirección debe tener una altura.';
}
