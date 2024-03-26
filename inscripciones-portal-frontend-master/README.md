# Front / Portal
## Repositorio:
```
https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/inscripciones-portal-frontend.git
```


Se debe de tomar el TAG siguiente: 
```
1.0.0-RC1
```

## Prerrequisitos de FRONT
- Instalación de NPM (paquetes en el sistema operativo), ultima versión, la cual se muestra en el documento de arquitectura.
- Instalación de ANGULAR CLI (paquetes en el sistema operativo), última versión, la cual se muestra en el documento de arquitectura.
Dar permisos de lectura y modificación al usuario.
- Instalación de APACHE SERVER (paquetes en el sistema operativo), última versión, la cual se muestra en el documento de arquitectura.


Se debe de tomar el TAG siguiente (dependiendo del proyecto):
```
https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/inscripciones-portal-frontend/-/tags/1.0.0-RC1
```


Después de bajar el código del GTILAB ir a la carpeta Source, se debe de copiar el código en una carpeta que se llama ciudadanos en el file system.
```
>/home/devadmin 
```

En este caso cambiara el file system dependiendo del ambiente.

Ya estando en el directorio correr los siguientes comandos:

```
>npm i --legacy-peer-deps

>ng build
```
Después de correr el comando dentro de la carpeta del proyecto se genera la carpeta 
```
dist
```
Esta carpeta genera una subcarpeta llamada:
```
pro
```

## Archivo de configuracion

Cabe destacar que existe un archivo llamado `config.json` de configuraciones de variables de entorno dentro de la carpeta `pro/assets/config`
aqui es donde se realiza toda la configuración de variables para la aplicación tanto como para inscripciones como para ciudadanos.

para este proyecto, se manejaria bajo esta estrutura
```
{
    "entorno": "",
    "production": ,
    "baseUrl": "",
    "baseUrlFron": "",
    "recaptchaKey": "",
    "baseHref": "./inscripciones/",
    "backendClient": ""

}
```

Ejemplo de los valores que estan en el ambiente de desarrollo;
```
    "entorno": "Staging",
    "production": false,
    "baseUrl": "https://inscripciones-backoffice-back-dev.gcba.gob.ar/inscripciones-service/api/",
    "baseUrlFron": "https://inscripciones-backoffice-back-dev.gcba.gob.ar/inscripciones-service/front/",
    "recaptchaKey": "6Ldow6skAAAAAGI8BhCuRrdoE7-ZiBOilH3LQm7c",
    "baseHref": "./inscripciones/",
    "backendClient": "https://inscripciones-back-dev.gcba.gob.ar/cliente/v1"
```


El contenido de la carpeta pro debe de copiarse a la ruta del APACHE SERVER en la siguiente ruta:
```
/var/www/html
```

### Archivo .htaccess
El archivo .htaccess se encuentra ubicado en la ruta 
```
/source/.htaccess
```
del repositorio.

## Configuración de un Host Virtual para el dominio INSCRIPCIONES y CIUDADANOS

### Requisitos previos
- Los clientes y el servidor web resuelven el dominio INSCRIPCIONES y CIUDADANOS a la
dirección IP del servidor web.
- Se debe añadir manualmente estas entradas al servidor DNS.Lo cual ya este hecho, y esta
parte se cumple sin problema, solo se agrega como referencia,

### Procedimiento

Instalar el paquete httpd:
```
yum install httpd
```

Editar el archivo 
```
/etc/httpd/conf/httpd.conf
```


Añadir al final del archivo las siguientes instrucciones de seguridad:
```
 ServerTokens Prod
 ServerSignature Off
 TraceEnable Off
```
