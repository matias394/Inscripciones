import { Pipe, PipeTransform } from '@angular/core';
import { timeShort } from '../utils/formatDate';

@Pipe({
  name: 'timeShort',
})
export class TimeShortPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Dividir en partes
    const parts = value.split(':');
    return parts[0] + ':' + parts[1] + ' hs';
  }
}
