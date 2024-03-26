import {InputComponent} from '../modelos/input-component';
import {PeticionTemplateOption} from './peticion-template-option';

export class PeticionInputComponent {

  key: string;
  type: string;
  templateOption: PeticionTemplateOption;

  constructor(campo: InputComponent) {
    this.key = campo.key;
    this.type = campo.type;
    this.templateOption = new PeticionTemplateOption(campo.templateOptions);
  }

}
