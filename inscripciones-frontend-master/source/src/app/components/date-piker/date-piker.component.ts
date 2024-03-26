import {
  Component,
  Input,
  NgZone,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs';

export interface Mindate {
  year: string;
  month: string;
  day: string;
}

@Component({
  selector: 'date-piker',
  template: `
    <input
      class="form-control"
      [ngClass]="control.invalid && control.touched ? 'has-error-input' : ''"
      [name]="name"
      [formControl]="control"
      [placeholder]="placeholder"
      ngbDatepicker
      #datepiker="ngbDatepicker"
      (click)="toggleDatePicker(datepiker)"
      (dateSelect)="onChangeValue($event)"
      [ngStyle]="{ height: height }"
      autocomplete="off"
      [minDate]="minDate.year ? minDate : initialDate"
    />
    <error-input
      [showError]="control.invalid && control.touched"
      [message]="messageError !== '' ? messageError : 'Este Campo es requerido'"
      [errors]="control.errors ? { required: true } : {}"
    >
    </error-input>
  `,
  styleUrls: ['./date-piker.component.css'],
})
export class DatePikerComponent implements OnInit {
  @Input() control: any = new FormControl();
  @Input() type: string;
  @Input() name: string = 'date';
  @Input() datepiker: any = 'ngbDatepicker';
  @Input() placeholder: string = 'dd-mm-yyyy';
  @Input() height: string = '48px';
  @Input() initialDate: object = {};
  @Input() messageError: string = '';
  @Input() minDate: Mindate = {
    year: '',
    month: '',
    day: '',
  };
  @Output() changeValue: EventEmitter<Mindate> = new EventEmitter<Mindate>();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.initialDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };
  }

  public toggleDatePicker(datePicker: any): void {
    datePicker.toggle();
    if (datePicker.isOpen()) {
      this.ngZone.onStable
        .asObservable()
        .pipe(take(1))
        .subscribe(() => {
          const elementToFocus = datePicker._elRef.nativeElement;
          if (elementToFocus) {
            elementToFocus.focus();
          }
        });
    }
  }

  onChangeValue(event: any): void {
    const year = event.year;
    const month = event.month <= 9 ? '0' + event.month : event.month;
    const day = event.day <= 9 ? '0' + event.day : event.day;
    const finalDate = year + '-' + month + '-' + day;
    const date = {
      year: year,
      month: month,
      day: day,
    };
    this.changeValue.emit(date);
  }
}
