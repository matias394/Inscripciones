# SERVICIOS EXTERNOS
Este proyecto usa Quarkus como framework principal, se encarga de gestionar los servicios externos que necesite la aplicacion.

### Prerequisitos
- Java 17
- Maven 3.6.x
- Instalacion de las librerias (que se encuentran en nexus):
  - models
  - utils

### Repositorio
La ruta del proyecto es la siguiente;
```shell script
git clone https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/servicios-externos.git
```



### Configuracion para el Config-Map
Se debe reemplazar cada una de las variables que se encuentraentre `${NOMBRE}`

```
quarkus.http.port=8080

quarkus.vertx.blocking-operation-timeout=4000
 
 
#===============================
# kafka
#===============================
kafka.bootstrap.servers= ${KAFKA_HOST}:9092

mp.messaging.outgoing.t01-reportes-inscriptos.topic=t01-reportes-inscriptos
mp.messaging.outgoing.t01-reportes-inscriptos.connector=smallrye-kafka
mp.messaging.outgoing.t01-reportes-inscriptos.value.serializer=io.quarkus.kafka.client.serialization.JsonbSerializer

mp.messaging.outgoing.t02-boti-inscriptos.topic=t02-boti-inscriptos
mp.messaging.outgoing.t02-boti-inscriptos.connector=smallrye-kafka
mp.messaging.outgoing.t02-boti-inscriptos.value.serializer=io.quarkus.kafka.client.serialization.JsonbSerializer

mp.messaging.outgoing.t03-s3-inscriptos.topic=t03-s3-inscriptos
mp.messaging.outgoing.t03-s3-inscriptos.connector=smallrye-kafka
mp.messaging.outgoing.t03-s3-inscriptos.value.serializer=io.quarkus.kafka.client.serialization.JsonbSerializer

mp.messaging.outgoing.t05-dopper-inscriptos.topic=t05-dopper-inscriptos
mp.messaging.outgoing.t05-dopper-inscriptos.connector=smallrye-kafka
mp.messaging.outgoing.t05-dopper-inscriptos.value.serializer=io.quarkus.kafka.client.serialization.JsonbSerializer


#===============================
# Data Source Oracle
#===============================
quarkus.hibernate-orm.dialect=org.hibernate.dialect.Oracle12cDialect
quarkus.datasource.jdbc.driver=oracle.jdbc.driver.OracleDriver
quarkus.datasource.jdbc.url=${ORACLE_URL}
quarkus.datasource.username=${ORACLE_USUARIO}
quarkus.datasource.password=${ORACLE_CONTRASEÑA}

quarkus.datasource.reactive.max-size=20
quarkus.datasource.reactive.min-size=5


#===============================
# ELASTICSEARCH
#===============================
indice.reportes.inscriptos=${ELASTIC_INDICE}

quarkus.elasticsearch.hosts=${ELASTIC_SERVER}
quarkus.elasticsearch.password=${ELASTIC_PASS}
quarkus.elasticsearch.username=${ELASTIC_USER}
quarkus.elasticsearch.protocol=${PROTOCOLO}


#===============================
# DOPPLER     
#===============================
doppler.api.key=${DOPPLER_KEY}
doppler.api.email=${DOPPLER_}
doppler.api.id=${DOPPLERID_}
custom.doppler-cancelacion-url=${DOPPLER_CANCEL}
doppler.api.url=${DOPPLER_URL}
doppler.api.endpoint=${DOPPLER_ENDPOINT}


#===============================
# QR 
#===============================
directory.web=/opt/imagenes/qr/


#===============================
# File Siz
#===============================
spring.http.multipart.max-file-size=10MB
spring.http.multipart.max-request-size=10MB


#===============================
# S3
#===============================
app.s3.endpoint=${S3_ENDPOINT}
app.s3.port=443
app.s3.accessKey=${S3_ACCESS}
app.s3.secretKey=${S3_SECRET}
app.s3.bucketName=Inscripciones-files
custom.file-extension-contenidoMultimedia=pdf,docx,doc,jpg,png,jpeg,xlsx,xls


#===============================
# BOTI
#===============================
boti.token=${BOTI_}
boti.intent=${BOTI_INTENT}
boti.multiple=${BOTI_MULTI}


#===============================
#= MIBA
#===============================
miba.grant_type=authorization_code
miba.redirect_uri_token=https://${MIBA_INSCRIPCION_ULR}/auth
miba.redirect_uri_logout=https://${MIBA_INSCRIPCION_ULR}/logout
miba.client_id=inscripciones
miba.client_secret=${MIBA_SECRET}
miba.getToken.urlToken=${MIBA_TOKEN}
miba.getToken.urlLogout=${MIBA_LOGOUT}
miba.urlUserInfo=${MIBA_INFO}


#===============================
# Token
#===============================
jwt.token.nameApplication111=inscripciones
jwt.token.secret111=Q4NSl604sgyHJj1qwEkR3ycUeR4uUAt7WJraD7EN3O9DVM4yyYuHxMEbSF4XXyYJkal13eqgB0F7Bq4H1
jwt.token.timeValidation111=200



#===============================
# CORS
#===============================
quarkus.http.cors=true
quarkus.http.cors.origins=${RUTA_FRONT_CIUDADANO}
quarkus.http.cors.methods=GET,POST,PUT,DELETE
quarkus.http.cors.headers=accept,authorization,content-type,x-requested-with


#===============================
# LOG
#===============================
quarkus.log.level=INFO
quarkus.log.console.format=%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n
quarkus.log.file.enable=true
quarkus.log.file.level=TRACE
quarkus.log.category."ar.inscripcion.ciudadano.lectura.filter.BasicAuthenticationMechanism".level=WARN


#===============================
# METRIC
#===============================
quarkus.micrometer.export.prometheus.enabled=true
quarkus.micrometer.registry-enabled-default=false


#===============================
# OPENTELEMETRY
#===============================
quarkus.opentelemetry.service-name=ciudadano-escirtura
quarkus.opentelemetry.tracer.enabled=true
quarkus.opentelemetry.exporters.otlp.enabled=true
quarkus.opentelemetry.exporters.otlp.endpoint=${TELEMETRY_HOST}

#===============================
#= QR
#===============================
frontend.url =${URL_ENTORNO_FRONT_INSCRIPCIONES}


#===============================
# MONGO
#===============================
quarkus.mongodb.connection-string=mongodb://${USER_MONGO}:${PASS_MONGO}@${URL_SERVER}:27017/inscripciones

```


**_Anexo:_** algunos ejemplos que esta en DEV:
```
...
quarkus.mongodb.hosts=10.9.11.118:27017
...
kafka.bootstrap.servers=inscripciones-cluster-kafka-dev-kafka-bootstrap:9092
```


### Acceso al NAS
Se solicita que este POD tenga acceso al NAS compartido, modificando el archivo `deployment.yaml`, dandole acceso al siguiente volumen `inscripciones-ciudadanos-dev-volume`

NOTA: `inscripciones-ciudadanos-dev-volume`, es el volumen de dev, actualizar al volumen de cada ambiente.
```
...
volumes:
...
- name: inscripciones-ciudadanos-dev-volume
  persistentVolumeClaim:
    claimName: pvc-inscripciones-ciudadanos-dev
...
volumeMounts:
...
- name: inscripciones-ciudadanos-dev-volume
  mountPath:/opt/imagenes
...

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


## Packaging and running the application

La aplicacion se puede enpaquetar usando el siguiente comando:
```shell script
./mvnw package
```