import { FormlyFieldConfig } from '@ngx-formly/core';

export interface PrevisualizarFormulario {
  nombre: string;
  secciones: {
    fields: FormlyFieldConfig[];
  }[];
}
