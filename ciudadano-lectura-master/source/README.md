# CIUDADANO-LECTURA
Este proyecto usa Quarkus como framework principal, se encarga de leer en Redis la informacion necesesaria para ser mostrada al cliente.

### Prerequisitos
- Java 17
- Maven 3.6.x
- Instalacion de las librerias (que se encuentran en nexus):
  - models
  - utils

### Repositorio
La ruta del proyecto es la siguiente;
```shell script
git clone https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/ciudadano-lectura.git
```



### Configuracion Config-Map
Se debe reemplazar cada una de las variables que se encuentraentre `${NOMBRE}`

```
quarkus.http.port=8080
  
#===============================
# MONGO
#===============================
quarkus.mongodb.credentials.username=${MONGO_USUARIO}
quarkus.mongodb.credentials.password=${MONGO_CONTRASEÑA}
quarkus.mongodb.database=inscripciones
quarkus.mongodb.hosts=${MONGO_HOST}:${MONGO_PORT}         


#===============================
#= REDIS
#===============================
quarkus.redis.hosts=${REDIS_HOST}:${REDIS_PORT}
quarkus.redis.password=toULVkmlPBDVPeNY


#===============================
# CORS
#===============================
quarkus.http.cors=true
quarkus.http.cors.origins=${RUTA_FRONT_CIUDADANO}
quarkus.http.cors.methods=GET,POST,PUT,DELETE
quarkus.http.cors.headers=accept,authorization,content-type,x-requested-with


#===============================
#= LOG
#===============================
quarkus.log.level=INFO
quarkus.log.console.format=%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n
quarkus.log.file.enable=true
quarkus.log.file.level=TRACE
quarkus.log.category."ar.inscripcion.ciudadano.lectura.filter.BasicAuthenticationMechanism".level=WARN


#===============================
#= METRIC
#===============================
quarkus.micrometer.export.prometheus.enabled=true
quarkus.micrometer.registry-enabled-default=false


#===============================
#= OPENTELEMETRY
#===============================
quarkus.opentelemetry.service-name=ciudadano-lectura
quarkus.opentelemetry.tracer.enabled=true
quarkus.opentelemetry.exporters.otlp.enabled=true
quarkus.opentelemetry.exporters.otlp.endpoint=${TELEMETRY_HOST}

```


**_Anexo:_** algunos ejemplos que esta en DEV:
```
...
quarkus.mongodb.hosts=10.9.11.118:27017
...
quarkus.redis.hosts=redis://redis.inscripciones-dev.svc.cluster.local:6379
```


### Health
Especificacion y extensiones relacionadas con la salud y el estado de funcionamiento de la aplicación
```
${HOST}/q/health
```


### Metric
Medición y registro de datos cuantitativos sobre el rendimiento y el comportamiento de la aplicación
```
${HOST}/q/metrics
```

### OpenApi
Especificación para definir interfaces de programación de aplicaciones (APIs) RESTfull
```
${HOST}/q/openapi?format=json
```


## Arrancar la aplicacion

Tu puedes arrancar la aplicacion de la siguiente forma:
```shell script
./mvnw compile quarkus:dev
```

## Packaging and running the application

La aplicacion se puede enpaquetar usando el siguiente comando:
```shell script
./mvnw package
```