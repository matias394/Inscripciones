# Inscripciones - Back

### Prerrequisitos de BACK

Instalación de jdk17 (paquetes en el sistema operativo), última versión, la cual se muestra en el documento de arquitectura. Instalación de jre17 (paquetes en el sistema operativo), última versión, la cual se muestra en el documento de arquitectura.

Se debe de instalar el jdk y jre en el sistema operativo para su correcto funcionamiento.

Se debe de bajar del repositorio:


```
git clone https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/inscripciones-backend
```
Se debe de tomar el TAG siguiente:

```
1.0.0-RC1
```

Después de bajar el código del GTILAB ir a la carpeta Source (donde se ha descargado el repositorio)


## Ejecucion de Scripts
En la ruta `/database` del repositorio se encuentra los siguientes archivos:
```
01_DDL_v0_2_0.sql
02_DDL_v0_2_0.sql
03_DML_v0_2_0.sql
04_DML_ORGANISMO_CATEGORIA.sql
05_DML_SEDE.sql
```

Se debe de ejecutar en el orden que especifica el numero que antepone la palabra.

## Instalacion de BACK

### Compilar

`${USER}` Usuario a crear. 

`${path_project}` hace referencia a la ruta donde se descargo el ejemplo: `/home/${USER}/repositorio`

Ingresamos al directorio 
```
${path_project}/source
```

aqui ejecutamos el comando:
```
>gradlew bootJar
```

Si nos aparece la siguiente salida, es que el proceso fue exitoso
```
BUILD SUCCESSFUL
```

el proceso de construccion arroja el jar que vamos a ejecutar, en la siguiente ruta:
```
${path_project}/source/build/libs
```

con el siguiente nombre:
```
> InscripcionesWsApp-1.0.0-RC1.jar
```


debemos crear la siguiente ruta archivos de configuracion de la aplicacion:
```
>mkdir /home/${USER}/jars/
>mkdir /home/${USER}/jars/inscripciones
>mkdir /home/${USER}/jars/inscripciones/config
```


Copias el archivo generado por el proceso `InscripcionesWsApp-1.0.0-RC1.jar`  en la ruta `/home/${USER}/jars/`

### configuracion:

tomar el archivo de configuracion que se encuentra en la siguiente ruta:
```
> ${path_project}/config/application.properties
```


Y Configurar las otras variables para cada entorno, ejemplo (BD Oracle, Mongo, etc), tener en cuenta los `TODO` dentro del 
archivo de configuracion, considero que son las variables a cambiar segun entorno, asi como dejo ejemplo comentado del entorno de `DEV`
```
#===============================
#==== Configuration Server =====
#===============================
server.port = 7090
server.servlet.context-path = /inscripciones-service


#===============================
#========= Data Source =========
#===============================

# TODO valor que usamos para dev: jdbc:oracle:thin:@10.9.11.118:1521:xe
spring.datasource.url=
# TODO valor que usamos para dev: DEVEPIDATA
spring.datasource.username=
# TODO valor que usamos para dev: DEVEPIDATA
spring.datasource.password=
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.datasource.tomcat.test-while-idle = true
spring.datasource.tomcat.validation-query = SELECT 1
spring.datasource.oracleucp.min-pool-size=5
spring.datasource.oracleucp.max-pool-size=15

#===============================
#======= JPA / Hibernate =======
#===============================
spring.jpa.open-in-view = false
spring.jpa.show-sql = true
spring.jpa.database = default
spring.jpa.hibernate.ddl-auto=none
spring.jpa.hibernate.naming.physical-strategy = org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.Oracle12cDialect

# TODO valor que usamos para dev:DEVEPIDATA
spring.jpa.properties.hibernate.default_schema=

#===============================
#=======     MONGODB     =======
#===============================

# TODO valor que usamos para dev:localhost
spring.data.mongodb.host=
# TODO valor que usamos para dev:27017
spring.data.mongodb.port=
# TODO valor que usamos para dev:inscripciones
spring.data.mongodb.database=
spring.data.mongodb.username=
spring.data.mongodb.password=

#===============================
#========= Logging App =========
#===============================
logging.level.org.hibernate.SQL = debug

#===============================
#==== Configuration Swagger ====
#===============================
springdoc.swagger-ui.enabled = true
springdoc.swagger-ui.path = /swagger-ui.html

spring.mvc.pathmatch.matching-strategy=ant_path_matcher


#===============================
# Active Directory
#===============================
# TODO valor que usamos para dev:https://servicios.gcba.gob.ar/ad/v1.2
custom.servicio-autentificacion-AD.url=
# TODO valor que usamos para dev:b28788b537c74244ac127b9f5b4cf038
custom.servicio-autentificacion-AD.client-id=
# TODO valor que usamos para dev:556c1C4F33D8401DBcB6959A4487E9d9
custom.servicio-autentificacion-AD.client-secret=


custom.servicio-autentificacion-AD.respuesta-correcta=OK
custom.servicio-autentificacion-AD.chequeoActivado=NO


#===============================
# Token
#===============================
jwt.token.nameApplication=inscripciones
jwt.token.secret=Q4NSl604sgyHJj1qwEkR3ycUeR4uUAt7WJraD7EN3O9DVM4yyYuHxMEbSF4XXyYJkal13eqgB0F7Bq4H1
jwt.token.timeValidation=9000
jwt.token.validarToken=true


#===============================
# Captcha
#===============================
# TODO valor que usamos para dev:6LfDGaokAAAAAPPnDbg5ysSGm6sLt9cMZSi0WRhb
google.recaptcha.site=
# TODO valor que usamos para dev:6LfDGaokAAAAACpKQgDajUI8IRILim5w-TkQJMVf
google.recaptcha.secret=
# TODO valor que usamos para dev:https://www.google.com/recaptcha/api/siteverify
google.recaptcha.endpoint=

google.recaptcha.serverSinInternetOk=true
google.recaptcha.validarCaptcha=false


#===============================
# CUSTOM
#===============================
# TODO valor que usamos para dev:  https://inscripciones-dev.gcba.gob.ar/
cors.url =


spring.main.allow-circular-references=true
# TODO valor que usamos para dev:https://inscripciones-dev.gcba.gob.ar/ciudadanos/
dominio.inscripcion.enlace=

```



### ejecutar:

Para ejecutando el proceso, debemos ingresar en la ruta `/home/${USER}/jars/` y ejecutar el siguiente comando:
```
> java -jar InscripcionesWsApp-1.0.0-RC1.jar --spring.config.location=file:///home/${USER}/jars/inscripciones/config/application.properties
```

## Configuracion de Certificado

### Requisitos previos
El servidor HTTP Apache está instalado y funcionando.
La clave privada se almacena en el archivo 
```
/etc/pki/tls/private/inscripciones.key.
```
Esta clave privada debe de proporcionarla Gobierno para poder agregarla en QA.
Si el CA de gobierno admite el protocolo ACME, se puede utilizar el módulo mod_md para
automatizar la recuperación y el aprovisionamiento de certificados TLS.
El certificado TLS se almacena en el archivo 
```
/etc/pki/tls/private/inscripciones.crt
```
El certificado CA se almacena en el archivo 
```
/etc/pki/tls/private/inscripciones.crt
```
Los clientes y el servidor web resuelven el nombre de host del servidor a la dirección IP del
servidor web.

### Procedimiento
Instalar el paquete mod_ssl:
```
dnf install mod_ssl
```
Editar el archivo
```
/etc/httpd/conf.d/ssl.conf
```

añadir la siguiente configuración a la directiva
```
&lt;VirtualHost _default_:443&gt;:
```

Establecer el nombre del servidor: https://inscripciones-qa.gcba.gob.ar

### Importante
El nombre del servidor debe coincidir con la entrada establecida en el campo Common Name del
certificado esto lo debe de validar la ASI.
Opcional: Si el certificado contiene nombres de host adicionales en el campo Subject Alt Names
(SAN), se puede configurar mod_ssl para que proporcione cifrado TLS también para estos
nombres de host.
Para configurarlo, hay que añadir el parámetro ServerAliases con los nombres correspondientes:

ServidorAlias https://inscripciones-qa.gcba.gob.ar

Establecer las rutas de acceso a la clave privada, el certificado del servidor y el certificado de la
CA:
```
SSLCertificateKeyFile &quot;/etc/pki/tls/private/inscrcipciones.key&quot;
SSLCertificateFile &quot;/etc/pki/tls/certs/inscripciones.crt&quot;
SSLCACertificateFile &quot;/etc/pki/tls/certs/ca_inscripciones.crt&quot;
```
Por razones de seguridad, se debe de configurar que sólo el usuario root pueda acceder al archivo
de la clave privada:

```
chown root:root /etc/pki/tls/private/inscripciones.key
chmod 600 /etc/pki/tls/private/inscripciones.key
```
Abrir el puerto 443 en el firewall local:
```
firewall-cmd --permanent --add-port=443
firewall-cmd --reload
```
Se valida que los servicios esten correctos por medio la la URL de swagger , la IP o Hostname cambia dependiendo el ambiente, la url es:
```
http://IP:7090/inscripciones-service/swagger-ui/index.html?configUrl=/inscripciones-service/v3/api-docs/swagger-config#/
```