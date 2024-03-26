import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class HeaderService {

  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() time: EventEmitter<string> = new EventEmitter();

  headerData(fullName: any) {
    this.change.emit(fullName);
  }

  timeData(time: any){
    this.time.emit(time);
  }

}