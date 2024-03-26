import { FormControl, ValidationErrors } from '@angular/forms';

import { Normalizador } from '@usig-gcba/normalizador';

// @ts-ignore
export function AutocompleterCalleValidador(control: FormControl): ValidationErrors {
  try {
    if (control.value && control.value.nombre) {
      const direccion = Normalizador.normalizar(control.value.nombre);
      if (direccion.length > 0) {
        if (direccion[0].calleCruce || !direccion[0].altura) {
          return { 'calle-usig-requiere-altura': true };
        } else {
          return null;
        }
      }
    }
  } catch (e) {
    return { 'calle-usig-invalida': true };
  }
}
