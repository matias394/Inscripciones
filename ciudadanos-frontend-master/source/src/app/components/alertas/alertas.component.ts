import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertas',
  template: `<div class="alert-wrapper">
    <div role="alert" [ngClass]="type" class="alert-div">
      <p class="alert-text">{{ message }}</p>
      <button
        *ngIf="showCloseButton"
        type="button"
        class="close alert-close"
        data-dismiss="alert"
        (click)="close()"
      >
        &times;
      </button>
    </div>
  </div>`,
  styleUrls: ['./alertas.component.scss'],
})
export class AlertasComponent implements OnInit {
  @Input() type: string = '';
  @Input() message: string = '';
  @Input() showCloseButton: boolean = false;
  @Output() onClose = new EventEmitter<Event>();

  constructor() {}

  close() {
    this.onClose.emit();
  }

  ngOnInit(): void {}
}
