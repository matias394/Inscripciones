import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button-load-more.component.html',
  styleUrls: ['./button-load-more.component.scss'],
})
export class ButtonLoadMoreComponent {
  @Input() text: string = 'Ver más';
  @Input() customClass: Array<string> = [];
}
