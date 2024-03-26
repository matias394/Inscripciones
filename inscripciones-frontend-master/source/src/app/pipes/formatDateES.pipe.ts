import { Pipe, PipeTransform } from '@angular/core';
import { formatDateDesdeHasta, formatDateES } from '../utils/formatDate';

@Pipe({
  name: 'formatDateES',
})
export class FormatDateESPipe implements PipeTransform {
  transform(dateString: string): string {
    return formatDateES(dateString);
  }
}
