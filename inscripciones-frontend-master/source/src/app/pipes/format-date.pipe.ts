import { Pipe, PipeTransform } from '@angular/core';
import { formatDateDesdeHasta } from '../utils/formatDate';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(dateString: string): string {
    if (!dateString) {
      return '';
    }
    return formatDateDesdeHasta(dateString);
  }
}
