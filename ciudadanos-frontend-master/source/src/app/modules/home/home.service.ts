import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class HomeService {

  @Output() change: EventEmitter<string> = new EventEmitter();

  titleData(titleInscription: any) {
    this.change.emit(titleInscription);
  }

}