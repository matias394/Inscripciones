import {PeticionInputComponent} from '../peticiones/peticion-input-component';
import {PeticionCheckboxComponent} from '../peticiones/peticion-checkbox-component';
import {PeticionTextareaComponent} from '../peticiones/peticion-textarea-component';
import {PeticionSelectComponent} from '../peticiones/peticion-select-component';


export class TypeclassLocator {

  static buscarClase(type: string) {
    const typeclasses = [
      {type: 'input', class: PeticionInputComponent},
      {type: 'checkbox', class: PeticionCheckboxComponent},
      {type: 'textarea', class: PeticionTextareaComponent},
      {type: 'select', class: PeticionSelectComponent},

    ];
    const associationClass = typeclasses.find((association) => association.type === type);
    if (associationClass) {
      return associationClass.class;
    } else {
      return null;
    }
  }
}
