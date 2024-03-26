Agregar la siguiente configuracion al config-map

- Ejecutar el siguiente script:
```
database/EMAIL_UPDATE_V1.sql
```

- Se deben crear los siguiente topic de kafka:
```
- t02-boti-inscriptos
- t03-s3-inscriptos
- t04-registro-inscriptos
- t05-dopper-inscriptos
```

- Se debe desabilitar / retirar el servicio / pod de logstach, ya que va a ser manejado por servicios-externos


- Se debe agregar las nuevas propiedades en el config-map:
```
#===============================
# KAFKA     
#===============================
spring.kafka.consumer.bootstrap-servers=${KAFKA_SERVER}:${KAFKA_PORT}
spring.kafka.consumer.group-id=myGroup
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.springframework.kafka.support.serializer.JsonDeserializer
spring.kafka.consumer.properties.spring.json.value.default.type=com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse
spring.kafka.consumer.properties.spring.json.add.type.headers=false
spring.kafka.consumer.properties.spring.json.trusted.packages=*

spring.kafka.producer.bootstrap-servers=${KAFKA_SERVER}:${KAFKA_PORT}
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer

kafka.topic.nombre.t4=t04-registro-inscriptos


#===============================
# REDIS     
#===============================
spring.redis.host=redis.inscripciones-dev.svc.cluster.local
spring.redis.port=6379
spring.redis.password=toULVkmlPBDVPeNY

```

- Se debe modificar el parametro, dentro del config-map, agregando la nueva URL de portal, separado por ",": 
```
#===============================
# CUSTOM
#===============================
cors.url=https://inscripciones-portal-frontend-dev.gcba.gob.ar,https://inscripciones-backoffice-dev.gcba.gob.ar
```
NOTA: Esta es la de `DEV` se debe colocar por la del ambiente en ejecucion.


### URL QA:
- https://inscripciones-portal-frontend-qa.gcba.gob.ar
- https://inscripciones-backoffice-qa.gcba.gob.ar

### URL HML:
- https://inscripciones-portal-frontend-hml.gcba.gob.ar
- https://inscripciones-backoffice-hml.gcba.gob.ar
