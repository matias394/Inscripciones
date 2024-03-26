Se debe agregar las siguiente variables al config-map:
```
{
    "backendCiudadanoLectura": ${URL_LECTURA},
    "backendCiudadanoEscritura": ${URL_ESCRITURA},
    "backendServiciosExternos": ${URL_EXTERNOS}
}
```

Descripcion de variables:

- ${URL_LECTURA}      : URL del nuevo componente ciudadano-lectura:
- ${URL_ESCRITURA}    : URL del nuevo componente ciudadano-escritura:
- ${URL_EXTERNOS}     : URL del nuevo componente servicios-externos:


Ejemplo de como esta en DEV:
```
    "backendCiudadanoLectura": "https://ciudadano-lectura-inscripciones-dev.gcba.gob.ar",
    "backendCiudadanoEscritura": "https://ciudadano-escritura-inscripciones-dev.gcba.gob.ar",
    "backendServiciosExternos": "https://servicios-externos-inscripciones-dev.gcba.gob.ar"
```

NOTA:
Se debe ajsutar las variables segun cada ambiente.

