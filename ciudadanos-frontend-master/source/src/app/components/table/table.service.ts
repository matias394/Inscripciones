import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class TableService {

  @Output() change: EventEmitter<string> = new EventEmitter();

  tableValidator(validate: any) {
    this.change.emit(validate);
  }

}