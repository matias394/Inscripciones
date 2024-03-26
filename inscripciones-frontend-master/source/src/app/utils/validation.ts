import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

export const minLengthArray = (min: number) => {
  return (c: AbstractControl): { [key: string]: any } => {
    if (c.value.length >= min) return null;

    return { MinLengthArray: true };
  };
};

export const validateStatus = () => {
  return (c: AbstractControl): { [key: string]: any } => {
    const length = c.value.length;
    const estados = c.value
      .map((inst, index) => {
        if (inst.estado === 1) {
          const sedes = inst.instanciaSedes;
          const sedesLength = sedes.length;
          const sedesEstado = sedes
            .map((sede) => sede.estado)
            .filter((estado) => estado === 0);

          if (sedesEstado.length === sedesLength) {
            const instacias = (c as FormArray).at(index);
            instacias.get('instanciaSedes').setErrors({
              statusIns: true,
            });
          }
        }
        return inst.estado;
      })
      .filter((el) => el === 0);
    if (estados.length === length) return { status: true };
    return null;
  };
};

export const minNumber = (min: number) => {
  return (c: AbstractControl): { [key: string]: any } => {
    return { MinLengthArray: parseInt(c.value) >= min };
  };
};

export function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map((control) => control.value.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
