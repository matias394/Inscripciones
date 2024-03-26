import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive, ElementRef, Renderer2 } from '@angular/core';

/**
 * Esta directiva mantiene el alto actual del componente en el placeholder al hacer el drag and drop
 */

@Directive({
  selector: '[appCampoPlaceholder]'
})
export class CampoPlaceholderDirective {

  constructor(
    private drag: CdkDrag,
    private element: ElementRef,
    private render: Renderer2
  ) {
    const height = this.drag.element.nativeElement.clientHeight;
    this.render.setStyle(this.element.nativeElement, 'height', `${height}px`);
  }
}
