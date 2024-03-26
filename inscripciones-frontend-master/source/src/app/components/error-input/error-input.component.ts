import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-input',
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.css'],
})
export class ErrorInputComponent implements OnInit {
  @Input() message: string = '';
  @Input() showError: boolean = false;
  @Input() errors;

  ngOnInit(): void {}
}
