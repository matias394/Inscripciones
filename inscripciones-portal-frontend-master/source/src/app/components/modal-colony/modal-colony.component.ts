import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-colony',
  templateUrl: './modal-colony.component.html',
  styleUrls: ['./modal-colony.component.scss'],
})
export class ModalColonyComponent implements OnInit {
  @Input() colony: any; // TODO: Crear interface
  @Output() triggerCancel: EventEmitter<any> = new EventEmitter();
  @Output() triggerConfirm: EventEmitter<any> = new EventEmitter();

  constructor() {}

  closeModal(): void {
    this.triggerCancel.emit();
  }

  confirmModal(): void {
    this.triggerConfirm.emit();
  }

  ngOnInit(): void {}
}
