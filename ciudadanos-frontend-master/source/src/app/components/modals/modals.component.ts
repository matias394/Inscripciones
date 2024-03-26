import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modals',
  template: ` <div class="modal d-block mt-5" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ title }}</h4>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              (click)="closeModal()"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              (click)="confirmModal()"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      data-dismiss="modal"
      class="modal-backdrop show"
      (click)="closeModal()"
    ></div>`,
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
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
