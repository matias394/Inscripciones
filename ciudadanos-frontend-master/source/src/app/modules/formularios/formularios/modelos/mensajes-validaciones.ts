import { FormlyFieldConfig } from '@ngx-formly/core';

export function requiredMessage(error, field: FormlyFieldConfig) {
  return `Este campo es requerido`;
}

export function minMessage(error, field: FormlyFieldConfig) {
  return `El valor debe ser mayor a ${field.templateOptions.min}`;
}

export function maxMessage(error, field: FormlyFieldConfig) {
  return `El valor debe ser menor a ${field.templateOptions.max}`;
}

export function minLengthMessage(error, field: FormlyFieldConfig) {
  return `El texto no puede tener menos de ${field.templateOptions.minLength} caracteres`;
}

export function maxLengthMessage(error, field: FormlyFieldConfig) {
  return `El texto no puede tener más de ${field.templateOptions.maxLength} caracteres`;
}

export const mensajesValidaciones = [
  { name: 'required', message: requiredMessage },
  { name: 'min', message: minMessage },
  { name: 'max', message: maxMessage },
  { name: 'minLength', message: minLengthMessage },
  { name: 'maxLength', message: maxLengthMessage }
];
