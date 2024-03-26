import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Clase que es extendida por los componentes que se subscriban a algun observable
 * para que tengan un mecanismo limpio para poder desuscribirse cuando se destruye el
 * componente
 */
// TODO: Add Angular decorator.
export abstract class SuscripcionCancelable implements OnDestroy {
  destroyed$ = new Subject<boolean>();

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
