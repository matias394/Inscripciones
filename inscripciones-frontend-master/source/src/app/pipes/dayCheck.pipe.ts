import { Pipe, PipeTransform } from '@angular/core';
import { DiasInst } from '../modules/inscripciones/interfaces';

@Pipe({ name: 'dayCheck' })
// PIPE: Recibe un array<Dias> y devuelve los dias que fueron seleccionado en el formulario
export class DayCheckPipe implements PipeTransform {
  transform(dias: DiasInst[]) {
    const regex = new RegExp(',', 'g');
    const arrayDia: any = [];
    dias.forEach((item) => {
      if (item.value) {
        arrayDia.push(item.label.slice(0, 3));
      }
    });
    return arrayDia.toString().replace(regex, ' - ');
  }
}
