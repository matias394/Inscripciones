import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'toggle-switch',
  template: `
    <div class="container-toggle">
      <label class="toggle-label">{{ label }}</label>
      <div class="container-switch" *ngIf="!oneTitle">
        <label class="switch-label" *ngIf="titleDisabled !== ''">
          {{ titleDisabled }}
        </label>
        <label class="switch">
          <input
            type="checkbox"
            #check
            [name]="name"
            [checked]="valueDefault"
            (change)="onChangeValue(check)"
          />
          <span class="slider round"></span>
        </label>
        <label class="switch-label" *ngIf="titleActive !== ''">
          {{ titleActive }}
        </label>
      </div>
      <div class="container-switch" *ngIf="oneTitle">
        <label class="switch">
          <input
            type="checkbox"
            #check
            [name]="name"
            [checked]="valueDefault"
            (change)="onChangeValue(check)"
          />
          <span class="slider round"></span>
        </label>
        <label class="switch-label" *ngIf="checkbox || valueDefault">
          {{ titleActive }}
        </label>
        <label class="switch-label" *ngIf="!checkbox && !valueDefault">
          {{ titleDisabled }}
        </label>
      </div>
    </div>
  `,
  styleUrls: ['./toggle-switch.component.css'],
})
export class ToggleSwitchComponent {
  @Input() control: FormControl;
  @Input() name: string;
  @Input() label: string = 'Modalidad de inscripcion';
  @Input() typeValue: string = 'boolean'; // boolean || object
  @Input() titleActive: string = '';
  @Input() titleDisabled: string = '';
  @Input() oneTitle: boolean = false;
  @Input() listValues: Array<string> = [];
  @Input() valueDefault: any = false;
  @Output() changeValue: EventEmitter<string> = new EventEmitter<any>(); // boolean || string
  public checkbox: boolean = false;

  ngOnInit(): void {}

  onChangeValue(check: any): void {
    this.checkbox = check.checked;
    switch (this.typeValue) {
      case 'object':
        let value = check.checked ? this.listValues[1] : this.listValues[0];
        return this.changeValue.emit(value);
      default:
        return this.changeValue.emit(check.checked);
    }
  }
}
