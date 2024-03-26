import { FormlyFieldConfig } from '@ngx-formly/core';

export function requiredMessage(error: any, field: FormlyFieldConfig) {
  return `Este campo es requerido`;
}

export function minMessage(error: any, field: FormlyFieldConfig) {
  return `El valor debe ser mayor a ${field.templateOptions.min}`;
}

export function maxMessage(error: any, field: FormlyFieldConfig) {
  return `El valor debe ser menor a ${field.templateOptions.max}`;
}

export function minLengthMessage(error: any, field: FormlyFieldConfig) {
  return `El texto no puede tener menos de ${field.templateOptions.minLength} caracteres`;
}

export function maxLengthMessage(error: any, field: FormlyFieldConfig) {
  return `El texto no puede tener más de ${field.templateOptions.maxLength} caracteres`;
}

export function mensajesValidaciones() {
  return {
    validationMessages: [
    { name: 'required', message: requiredMessage },
    { name: 'min', message: minMessage },
    { name: 'max', message: maxMessage },
    { name: 'minlength', message: minLengthMessage },
    { name: 'maxlength', message: maxLengthMessage }
    ]
  };
}
