import { FormlySelectOptionsPipe } from "@ngx-formly/core/select";

export interface formulariosDto {
  fields?: string[];
  fieldGroupClassName?: string;
  fieldGroup?: FieldGroup[];
}

export interface FieldGroup {
  className: string;
  key: string;
  type: string;
  templateOptions: TemplateOptions;
  validation?: Validation;
}
export interface TemplateOptions {
  label: string;
  required: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  options?: any,
  extra_options?: ExtraOptions;
}
export interface ExtraOptions {
  integracion_miba?: boolean;
  valor_miba?: string;
  es_editable?: boolean;
  es_subsanable?: boolean;
  grupo_iterativo?: string;
}
export interface Validation {
  messages: any
}


let inputExample1: formulariosDto = {
  fieldGroupClassName: 'row', // nueva fila por cada input
  fieldGroup: [
    {
      className: 'col-12', // Grilla completa por default
      key: 'testInput', // Identificador unico
      type: 'text', // text - select - number - etc
      templateOptions: {
        label: 'Etiqueta',
        required: true,
        pattern: null, // Regex en caso de ser necesario (ejemplo: Solo Alfanumerico)
        minLength: 10,
        maxLength: 15,
        extra_options: { // Valores customizables para integraciones y demas
          integracion_miba: false,
          valor_miba: null,
          es_editable: false,
          es_subsanable: false,
          grupo_iterativo: null
        }
      },
      validation: {
        messages: {         // Mensajes de validaciones
          pattern: 'Solo valores alfanumericos',
          required: 'El campo es requerido'
        }
      }
    }
  ]
}

let inputExample2: formulariosDto = {
    fieldGroupClassName: 'row',
    fieldGroup: [{
      className: 'col-6',
      key: 'pais',
      type: 'select',
      templateOptions: {
        label: 'País',
        required: true,
        options: [
          { label: 'Argentina', value: 'argentina' },
          { label: 'Brasil', value: 'brasil' },
          { label: 'Barbados', value: 'barbados' },
          { label: 'Bangladesh', value: 'bangladesh' },
          { label: 'Honduras', value: 'honduras' },
        ]
      },
    }],
}


let formExample = [
  inputExample1,
  inputExample2
]
