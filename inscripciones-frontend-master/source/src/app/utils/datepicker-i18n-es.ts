import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

//FUNCION QUE MODIFICA EL IDIOMA DEL CALENDARIO DE INGLES A ESPAÑOL

const I18N_VALUES = {
  es: {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
  },
};

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES['es'].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES['es'].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
