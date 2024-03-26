import { isPlatformBrowser } from '@angular/common';
import {
  ClassProvider,
  FactoryProvider,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';

/* Cree un nuevo token de inyección para inyectar la ventana en un componente. */
export const WINDOW = new InjectionToken('WindowToken');

/* Defina una clase abstracta para obtener una referencia al objeto de ventana global. */
export abstract class WindowRef {
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

/* Defina la clase que implementa la clase abstracta y devuelve el objeto de ventana nativo. */
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  override get nativeWindow(): Window | Object {
    return window;
  }
}

/* Cree una función de fábrica que devuelva el objeto de ventana nativo. */
function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: Object
): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

/* Cree un proveedor inyectable para el token WindowRef que use la clase BrowserWindowRef. */
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

/* Cree un proveedor inyectable que use la función windowFactory para devolver el objeto de ventana nativo. */
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

/* Crear un array de providers. */
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
