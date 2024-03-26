import { Inject, Injectable } from '@angular/core';
import { WINDOW } from './window.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import { WindowSize } from '../models/windowSize';

@Injectable({
  providedIn: 'root',
})
export class WindowDimensionService {
  readonly windowSizeChanged = new BehaviorSubject<WindowSize>(<WindowSize>{
    width: this.window.innerWidth,
    height: this.window.innerHeight,
  });

  constructor(@Inject(WINDOW) public window: Window) {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(100),
        map(
          (event: any) =>
            <WindowSize>{
              width: event['currentTarget'].innerWidth,
              height: event['currentTarget'].innerHeight,
            }
        )
      )
      .subscribe((ws) => {
        this.windowSizeChanged.next(ws);
      });
  }
}
