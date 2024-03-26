import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwitchModalService {
  constructor() {}

  $modal = new EventEmitter<any>();
}
