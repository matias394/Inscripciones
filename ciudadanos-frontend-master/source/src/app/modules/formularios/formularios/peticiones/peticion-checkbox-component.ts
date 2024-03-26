import {CheckboxComponent} from '../modelos/checkbox-component';
import {PeticionTemplateOption} from './peticion-template-option';

export class PeticionCheckboxComponent {

  key: string;
  type: string;
  templateOption: PeticionTemplateOption;

  constructor(campo: CheckboxComponent) {
    this.key = campo.key;
    this.type = campo.type;
    this.templateOption = new PeticionTemplateOption(campo.templateOptions);
  }

}
