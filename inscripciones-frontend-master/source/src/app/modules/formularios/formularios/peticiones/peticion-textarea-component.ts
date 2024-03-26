import {TextareaComponent} from '../modelos/textarea-component';
import {PeticionTemplateOption} from './peticion-template-option';

export class PeticionTextareaComponent {

  key: string;
  type: string;
  templateOption: PeticionTemplateOption;

  constructor(campo: TextareaComponent) {
    this.key = campo.key;
    this.type = campo.type;
    this.templateOption = new PeticionTemplateOption(campo.templateOptions);
  }

}
