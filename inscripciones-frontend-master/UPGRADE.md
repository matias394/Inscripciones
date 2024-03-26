## Cambio en el configmap

Agegar en el configmap las siguientes nuevas variables:

```
"backendCiudadanoLectura":"https://ciudadano-lectura-inscripciones-dev.gcba.gob.ar",
"backendCiudadanoEscritura":"https://ciudadano-escritura-inscripciones-dev.gcba.gob.ar",
"backendServiciosExternos":"https://servicios-externos-inscripciones-dev.gcba.gob.ar"
```

`NOTA:` Estas variables que agrego son las de `DEV`, se debe cambiar el `DEV` por el `AMBIENTE` (QA,HML,ETC) respectivo.


### URL QA:
- https://ciudadano-lectura-inscripciones-qa.gcba.gob.ar
- https://ciudadano-escritura-inscripciones-qa.gcba.gob.ar
- https://servicios-externos-inscripciones-qa.gcba.gob.ar


### URL HML:
- https://ciudadano-lectura-inscripciones-hml.gcba.gob.ar
- https://ciudadano-escritura-inscripciones-hml.gcba.gob.ar
- https://servicios-externos-inscripciones-hml.gcba.gob.ar

 
