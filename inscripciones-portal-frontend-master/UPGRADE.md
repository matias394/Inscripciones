# Actualizar

Se debe actualizar los config maps de los siguientes pods:

- inscripciones-backend
- ciudadano-backend

Para estos 2 pods, buscar en sus referentes config-maps
```
cors.url=
```

Agregar la URL=´https://inscripciones-portal-frontend-qa.gcba.gob.ar´ separado con una "," (coma) 

Ejemplo del ambiente QA en su configmap de:

- ciudadano-backend:
```
cors.url=https://inscripciones-dev.gcba.gob.ar,https://inscripciones-portal-frontend-dev.gcba.gob.ar
```

- inscripciones-backend
```
cors.url=https://inscripciones-backoffice-dev.gcba.gob.ar,https://inscripciones-portal-frontend-dev.gcba.gob.ar
```
Y asi en cada uno de sus ambiente de HML y PRO

Nota:
- Aun no tenemos la URL de produccion de portal, tomar en cuenta eso.

### URL QA:
- https://inscripciones-qa.gcba.gob.ar
- https://inscripciones-portal-frontend-qa.gcba.gob.ar

### URL HML:
- https://inscripciones-hml.gcba.gob.ar
- https://inscripciones-portal-frontend-hml.gcba.gob.ar

