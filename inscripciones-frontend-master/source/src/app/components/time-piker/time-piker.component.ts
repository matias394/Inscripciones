import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'time-piker',
  template: `
    <input
      class="form-control"
      [name]="name"
      formControlName="control"
      [placeholder]="placeholder"
      (change)="onChangeValue()"
      [ngStyle]="{ height: height, width: width }"
      type="time"
    />
  `,
  styleUrls: ['./time-piker.component.scss'],
})
export class TimePikerComponent {
  @Input() control: FormControl;
  @Input() name: string = '';
  @Input() timepiker: any;
  @Input() placeholder: string = 'hh-mm-ss';
  @Input() height: string = 'auto';
  @Input() width: string = '155px';
  @Output() changeValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onChangeValue(): void {
    console.log('time');
    console.log(this.control);
    console.log(this.changeValue);
    console.log(this.name);
  }
}
