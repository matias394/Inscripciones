import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() max: number = 32;
  @Input() id: string;
  @Input() control: any = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() messageError: string = '';

  constructor() {}

  ngOnInit(): void {}
}
