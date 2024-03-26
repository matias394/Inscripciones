import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[componenteDinamico]',
})
export class ComponenteDinamicoDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
