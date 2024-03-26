import {SelectComponent} from '../modelos/select-component';
import {PeticionTemplateOption} from './peticion-template-option';

export class PeticionSelectComponent {

  key: string;
  type: string;
  templateOption: PeticionTemplateOption;

  constructor(campo: SelectComponent) {
    this.key = campo.key;
    this.type = campo.type;
    this.templateOption = new PeticionTemplateOption(campo.templateOptions);
  }

}
