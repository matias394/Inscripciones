import {TemplateOption} from '../modelos/template-option';

export class PeticionTemplateOption {

  label: string;
  required: boolean;
  options?: any[];
  pattern?: string;

  constructor(templateOption: TemplateOption) {
    this.label = templateOption.label ? templateOption.label : undefined;
    this.required = templateOption.required;
    this.pattern = templateOption.pattern ? templateOption.pattern : undefined;
    this.options = templateOption.options ? templateOption.options : undefined;
  }

}
