import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() control: any = new FormControl();
  @Input() label: string;
  @Input() disabled: boolean = false;
  @Input() messageError: string = 'Debe seleccionar un elemento';

  constructor() {}

  ngOnInit(): void {
    console.log(this.control);
  }
}
