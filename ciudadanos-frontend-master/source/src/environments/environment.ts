// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mibaURL: 'https://mibalogin-dev.gcba.gob.ar/auth/realms/',
  redirectUri: 'https://inscripciones-dev.gcba.gob.ar/ciudadanos/auth',
  redirectLogout: 'https://inscripciones-dev.gcba.gob.ar/ciudadanos/logout',
  backendClient: 'https://inscripciones-back-dev.gcba.gob.ar/cliente',
  backendCiudadanoLectura: 'http://ciudadano-lectura-inscripciones-dev.apps.ocp4-dev.gcba.gob.ar',
  backendCiudadanoEscritura: 'http://ciudadano-escritura-inscripciones-dev.apps.ocp4-dev.gcba.gob.ar',
  backendServiciosExternos: 'http://servicios-externos-inscripciones-dev.apps.ocp4-dev.gcba.gob.ar',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
