import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortTime' })
export class ShortTime implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Dividir en partes
    const parts = value.split(':');
    return parts[0] + ':' + parts[1] + ' hs';
  }
}
