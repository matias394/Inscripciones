import { FormControl, ValidationErrors } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import _ from "underscore";

export function InputSimpleHTMLValidador(control: FormControl, field: FormlyFieldConfig): ValidationErrors {
    let isValid = true;
    const caracteresInvalidos = ['<', '>', '$']
  _.forEach(caracteresInvalidos, caracter => {
    if (control.value && control.value.toLowerCase().includes(caracter)) {
      isValid = false;
    }
  });

  return isValid ? null : {'input-html-novalido': true};

}
