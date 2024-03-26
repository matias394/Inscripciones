import { Pipe, PipeTransform } from '@angular/core';
import { Sedes, sedesDto } from '../modules/inscripciones/interfaces';

@Pipe({
  name: 'sedeName',
})
export class SedeNamePipe implements PipeTransform {
  transform(id: number, sedes: Array<Sedes>): string {
    const sedeName = sedes.filter((sede) => sede.id === id);
    return sedeName[0]?.nombre;
  }
}
