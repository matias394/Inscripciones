# Front / Inscripciones :)


```
git clone https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/inscripcionesfront

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
https://repositorio-asi.buenosaires.gob.ar/secitd/inscripciones/inscripcionesfront/-/tags/1.0.0-RC1
```

Después de bajar el código del GTILAB ir a la carpeta Source, se debe de copiar el código en una carpeta que se llama ciudadanos en el file system.

```
>/home/devadmin
```

En este caso cambiara el file system dependiendo del ambiente.

Ya estando en el directorio (bien sea ciudadanos o inscripciones, dependiendo de la instalación que se este realizando) correr los siguientes comandos:

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

### Archivo Configuracion

Cabe destacar que existe un archivo llamado config.json de configuraciones de variables de entorno dentro de la carpeta pro/assets/config
aqui es donde se realiza toda la configuración de variables para la aplicación tanto como para inscripciones como para ciudadanos.

Para este proyecto se manejara esta estructura:
```
{
  "entorno": "",
  "production": ,
  "baseUrl": "",
  "recaptchaKey": "",
  "baseHref": ""
}
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


Se debe de copiar en la carpeta desplegable del compilado de Angular, en la raiz del mismo (Apache)


## Configuración de un Host Virtual para el dominio INSCRIPCIONES
### Requisitos previos
- Los clientes y el servidor web resuelven el dominio INSCRIPCIONES y CIUDADANOS a la
<<<<<<< HEAD
  dirección IP del servidor web.
- Se debe añadir manualmente estas entradas al servidor DNS.Lo cual ya este hecho, y esta
  parte se cumple sin problema, solo se agrega como referencia,
=======
dirección IP del servidor web.
- Se debe añadir manualmente estas entradas al servidor DNS.Lo cual ya este hecho, y esta
parte se cumple sin problema, solo se agrega como referencia,
>>>>>>> 9f942ae0dc69e4a1e641999bd264d4067f8ec010

### Procedimiento

Instalar el paquete httpd:
```
yum install httpd
```

Editar el archivo

```
/etc/httpd/conf/httpd.conf
```

Añadir la siguiente configuración de host virtual para el dominio INSCRIPCIONES:

```
<VirtualHost \*:80>
DocumentRoot "/var/www/inscripciones/"
ServerName https://inscripciones-qa.gcba.gob.ar/inscripciones/
CustomLog /var/log/httpd/inscripciones_access.log combined
ErrorLog /var/log/httpd/ inscripciones_error.log
</VirtualHost>
```

Estos ajustes configuran lo siguiente:
- Todos los ajustes de la directiva

```
<VirtualHost \*:80>
```
son específicos para este host virtual.
- DocumentRoot establece la ruta del contenido web del host virtual.
- ServerName establece los dominios para los que este host virtual sirve
<<<<<<< HEAD
  contenido.
=======
contenido.
>>>>>>> 9f942ae0dc69e4a1e641999bd264d4067f8ec010
- CustomLog establece la ruta del registro de acceso del host virtual.
- ErrorLog establece la ruta del registro de errores del host virtual.

Añadir una configuración de host virtual similar para el dominio Ciudadanos:

```
<VirtualHost \*:80>
DocumentRoot "/var/www/ciudadanos/"
ServerName https://inscripciones-qa.gcba.gob.ar/ciudadanos/
CustomLog /var/log/httpd/ciudadanos_access.log combined
ErrorLog /var/log/httpd/ciudadanos_error.log
</VirtualHost>
```


Se deben de crear las raíces de los documentos para ambos hosts virtuales:

```
> mkdir /var/www/inscripciones/
> mkdir /var/www/ciudadanos/
```

Se deben de establecer las rutas en los parámetros de DocumentRoot que no están dentro
de /var/www/, se debe de establecer el contexto httpd_sys_content_t en ambas raíces del
documento:

```
semanage fcontext -a -t httpd_sys_content_t "/srv/inscripciones (/. \*)?"

restorecon -Rv /srv/example.com/

semanage fcontext -a -t httpd_sys_content_t "/srv/ciudadanos (/.\*)?"

restorecon -Rv /srv/example.net/

```

Estos comandos establecen el contexto httpd_sys_content_t en el directorio /srv/inscripciones/ y /srv/ciudadanos/.
Hay que tener en cuenta que se debe instalar el paquete policycoreutils-python-utils para
ejecutar el comando restorecon.
Abrir el puerto 80 en el firewall local:
restorecon -Rv /srv/example.net/
```

> firewall-cmd --permanent --add-port=80/tcp

> firewall-cmd --reload

```
Habilitar e iniciar el servicio httpd:

```

systemctl enable --now httpd

```

Pasos de verificación

Se debe de compilar y generar el index de manera normal como se ha estado haciendo
siempre y posteriormente seguir estos pasos:

```
echo "vHost inscripciones" > /var/www/inscripciones/index.html

```

Ir al navegador y conectarse a
```
https://inscripciones-qa.gcba.gob.ar/inscripciones/

```

El servidor  web debe de mostrar el aplicativo de inscripciones.

Se baja y levanta el APACHE con los siguientes comandos
```
systemctl start httpd
systemctl stop httpd

<<<<<<< HEAD
```

=======
```
>>>>>>> 9f942ae0dc69e4a1e641999bd264d4067f8ec010
