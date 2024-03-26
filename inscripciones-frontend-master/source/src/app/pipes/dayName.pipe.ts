import { Pipe, PipeTransform } from '@angular/core';
import { formatDateDesdeHasta } from '../utils/formatDate';

@Pipe({
  name: 'dayName',
})
export class DayName implements PipeTransform {
  transform(dateString: string, formatDate: string = 'YYYY-MM-DD'): string {
    if (!dateString) {
      return '';
    }
    const arrDay = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    const parts = dateString.split('-').map(Number);
    let dayNumber;
    switch (formatDate.toUpperCase()) {
      case 'YYYY-MM-DD':
        dayNumber = new Date(parts[0], parts[1] - 1, parts[2]).getDay();
        break;
      case 'YYYY-DD-MM':
        dayNumber = new Date(parts[0], parts[2] - 1, parts[1]).getDay();
        break;
      case 'DD-MM-YYYY':
        dayNumber = new Date(parts[2], parts[1] - 1, parts[0]).getDay();
        break;
      default:
        dayNumber = new Date(parts[0], parts[1] - 1, parts[2]).getDay();
        break;
    }

    return arrDay[dayNumber];
  }
}
