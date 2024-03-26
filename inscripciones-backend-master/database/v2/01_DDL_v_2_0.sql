create table INSCRIPCIONES.CATEGORIA
(
    ID             NUMBER(22)     not null constraint CATEGORIA_PK primary key,
    NOMBRE         NVARCHAR2(255) not null,
    NIVEL          NVARCHAR2(250) not null,
    PADRE_ID       NUMBER(22),
    SEQ            NVARCHAR2(20)  not null,
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.CORREO
(
    ID             NUMBER(22)     not null constraint CORREO_PK primary key,
    NOMBRE         NVARCHAR2(255) not null,
    ASUNTO         NVARCHAR2(255) not null,
    DESCRIPCION    NVARCHAR2(1000),
    HTML           CLOB           not null,
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.ESTADO
(
    ID             NUMBER(10)     not null constraint ESTADO_PK primary key,
    NOMBRE         NVARCHAR2(250) not null,
    DESCRIPCION    NVARCHAR2(1000),
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.FORMULARIO
(
    ID             NUMBER(22)     not null constraint FORMULARIO_PK primary key,
    NOMBRE         NVARCHAR2(250) not null,
    DESCRIPCION    NVARCHAR2(1000),
    ID_REF_MONGO   VARCHAR2(250)  not null,
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(1)      not null,
    DIRIGIDO       NUMBER
);

create table INSCRIPCIONES.MENU
(
    ID             NUMBER(22) not null constraint MENU_PK primary key,
    BAJA           NUMBER(2)  not null,
    HIJO_ORDEN     NUMBER(10),
    COLOR          NVARCHAR2(255),
    ESTILO         NVARCHAR2(255),
    ICONO          NVARCHAR2(255),
    NOMBRE         NVARCHAR2(255),
    PADRE_ID       NUMBER(22) not null constraint MENU_MENU_FK references INSCRIPCIONES.MENU,
    RUTA           NVARCHAR2(255),
    CHILDREN_ORDER NUMBER(19),
    NAME           VARCHAR2(255 char),
    PARENT_ID      NUMBER(19)
);

create table INSCRIPCIONES.MODALIDAD
(
    ID             NUMBER(22)     not null constraint MODALIDAD_PK primary key,
    NOMBRE         NVARCHAR2(250) not null,
    DESCRIPCION    NVARCHAR2(1000),
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.NOTIFICACION
(
    ID             NUMBER(10)     not null constraint NOTIFICACION_PK primary key,
    NOMBRE         VARCHAR2(250)  not null,
    DESCRIPCION    NVARCHAR2(1000),
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.ORGANISMO
(
    ID             NUMBER(22)     not null constraint ORGANISMO_PK primary key,
    NOMBRE         NVARCHAR2(255) not null,
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.ORGANISMO_CATEGORIA
(
    ID           NUMBER(22) not null constraint ORGANISMO_CATEGORIA_PK  primary key,
    ORGANISMO_ID NUMBER(22) not null constraint ORGANISMO_CATEGORIA_ORGANISMO_FK references INSCRIPCIONES.ORGANISMO,
    CATEGORIA_ID NUMBER(22) not null constraint ORGANISMO_CATEGORIA_CATEGORIA_FK references INSCRIPCIONES.CATEGORIA,
    ESTADO       NUMBER(2)
);

create table INSCRIPCIONES.PERMISO
(
    ID             NUMBER(22)     not null  constraint PERMISO_PK  primary key,
    NOMBRE         NVARCHAR2(255) not null,
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.PERMISO_MENU
(
    ID         NUMBER(22) not null constraint PERMISO_MENU_PK  primary key,
    PERMISO_ID NUMBER(22) not null constraint PERMISO_MENU_PERMISO_FK references INSCRIPCIONES.PERMISO,
    MENU_ID    NUMBER(22) not null constraint PERMISO_MENU_MENU_FK references INSCRIPCIONES.MENU
);

create table INSCRIPCIONES.ROL
(
    ID             NUMBER(22)     not null  constraint ROL_PK primary key,
    NOMBRE         NVARCHAR2(250) not null,
    DESCRIPCION    NVARCHAR2(1000),
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.ROL_PERMISO
(
    ID         NUMBER(22) not null constraint ROL_PERMISO_PK primary key,
    ROL_ID     NUMBER(22) not null constraint ROL_PERMISO_ROL_FK references INSCRIPCIONES.ROL,
    PERMISO_ID NUMBER(22) not null constraint ROL_PERMISO_PERMISO_FK references INSCRIPCIONES.PERMISO
);

create table INSCRIPCIONES.SEDE
(
    ID             NUMBER(22)      not null constraint SEDE_PK primary key,
    NOMBRE         NVARCHAR2(250)  not null,
    DIRECCION      NVARCHAR2(2000) not null,
    PISO           NVARCHAR2(250),
    EMAIL          NVARCHAR2(250),
    TELEFONO       NVARCHAR2(250),
    BLOQUEADO      NUMBER(2)       not null,
    CREADO         DATE            not null,
    CREADO_POR     NVARCHAR2(255)  not null,
    MODIFICADO     DATE            not null,
    MODIFICADO_POR NVARCHAR2(255)  not null,
    ESTADO         NUMBER(2)       not null
);

create table INSCRIPCIONES.TIPO
(
    ID             NUMBER         not null constraint TIPO_PK primary key,
    NOMBRE         NVARCHAR2(255) not null,
    DESCRIPCION    NVARCHAR2(1000),
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null
);

create table INSCRIPCIONES.INSCRIPCION
(
    ID                     NUMBER(22) not null constraint INSCRIPCION_PK  primary key,
    ORGANISMO_CATEGORIA_ID NUMBER(22) not null constraint INSCRIPCION_ORGANISMO_CATEGORIA_FK  references INSCRIPCIONES.ORGANISMO_CATEGORIA,
    CORREO_ID              NUMBER(22) not null constraint INSCRIPCION_CORREO_FK references INSCRIPCIONES.CORREO,
    NOTIFICACION_ID        NUMBER(22) not null constraint INSCRIPCION_NOTIFICACION_FK references INSCRIPCIONES.NOTIFICACION,
    TIPO_ID                NUMBER(22) not null constraint INSCRIPCION_TIPO_FK references INSCRIPCIONES.TIPO,
    ESTADO_ID              NUMBER(22) not null  constraint INSCRIPCION_ESTADO_FK references INSCRIPCIONES.ESTADO,
    FERIADO                NUMBER(2),
    CUPOS_GRUPALES         NUMBER(2),
    LOGIN_MIBA             NUMBER(2),
    CANTIDAD_MAXIMA        NUMBER(20),
    NOMBRE                 NVARCHAR2(250),
    URL                    NVARCHAR2(250),
    RETORNO_URL            VARCHAR2(250),
    CREADO                 DATE,
    CREADO_POR             NVARCHAR2(250),
    MODIFICADO             DATE,
    MODIFICADO_POR         NVARCHAR2(250),
    ESTADO                 NUMBER(2)  not null,
    CUPOS_PARA_OTROS       NUMBER
);

create table INSCRIPCIONES.FORMULARIO_INSCRIPCION
(
    ID             NUMBER(22) not null constraint FORMULARIO_INSCRIPCION_PK primary key,
    FORMULARIO_ID  NUMBER(22) not null  constraint FORMULARIO_INSCRIPCION_FORMULARIO_FK references INSCRIPCIONES.FORMULARIO,
    INSCRIPCION_ID NUMBER(22) not null constraint FORMULARIO_INSCRIPCION_INSCRIPCION_FK  references INSCRIPCIONES.INSCRIPCION
);

create table INSCRIPCIONES.INSTANCIA
(
    ID                 NUMBER(22) not null  constraint AGENDA_PK  primary key,
    INSCRIPCION_ID     NUMBER(22) not null  constraint AGENDA_INSCRIPCION_FK references INSCRIPCIONES.INSCRIPCION,
    MODALIDAD_ID       NUMBER(22)  constraint FK7WBBT3MXAO2677MW0W9XFU2A2 references INSCRIPCIONES.MODALIDAD,
    NOMBRE             NVARCHAR2(250),
    DURACION_SEMANA    NUMBER(10),
    LIMITE_INSCRIPCION DATE,
    FECHA_INICIO       DATE,
    FECHA_FIN          DATE,
    BLOQUEADO          NUMBER(1),
    CREADO             DATE,
    CREADO_POR         VARCHAR2(250),
    MODIFICADO         DATE,
    MODIFICADO_POR     NVARCHAR2(250),
    ESTADO             NUMBER(1)
);

create table INSCRIPCIONES.USUARIO
(
    ID             NUMBER(22)     not null constraint USUARIO_PK primary key,
    ROL_ID         NUMBER(22)     not null constraint USUARIO_ROL_FK references INSCRIPCIONES.ROL,
    ORGANISMO_ID   NUMBER(22)   constraint FKTGD5FWEE9U136I30UHW8SSOE2 references INSCRIPCIONES.ORGANISMO,
    DNI            NVARCHAR2(22),
    CUIL           NVARCHAR2(22)  not null,
    NOMBRE         NVARCHAR2(255) not null,
    APELLIDO       NVARCHAR2(255) not null,
    EMAIL          NVARCHAR2(255) not null,
    GENERO         NVARCHAR2(255),
    NACIONALIDAD   NVARCHAR2(255),
    CREADO         DATE           not null,
    CREADO_POR     NVARCHAR2(255) not null,
    MODIFICADO     DATE           not null,
    MODIFICADO_POR NVARCHAR2(255) not null,
    ESTADO         NUMBER(2)      not null,
    PASSWORD       NVARCHAR2(150),
    INTENTOS       NUMBER
);

create table INSCRIPCIONES.USUARIO_ORGANISMO_CATEGORIA
(
    ID                     NUMBER(22),
    USUARIO_ID             NUMBER(22) not null constraint USUARIO_CATEGORIA_USUARIO_FK references INSCRIPCIONES.USUARIO,
    ORGANISMO_CATEGORIA_ID NUMBER(22) not null constraint USUARIO_ORGANISMO_CATEGORIA_ORGANISMO_CATEGORIA_FK references INSCRIPCIONES.ORGANISMO_CATEGORIA,
    ESTADO                 NUMBER(1)
);

create table INSCRIPCIONES.USUARIO_EXTERNO
(
    ID             NUMBER(19)         not null  primary key,
    CREADO         DATE,
    CREADO_POR     VARCHAR2(255 char),
    ESTADO         NUMBER(10),
    MODIFICADO     DATE,
    MODIFICADO_POR VARCHAR2(255 char),
    APELLIDO       VARCHAR2(100 char) not null,
    CUIL           VARCHAR2(255 char),
    DNI            VARCHAR2(255 char),
    EMAIL          VARCHAR2(255 char) not null constraint UK_7LHFG2BJPLW04FHILOV6I5CDD  unique,
    GENERO         VARCHAR2(255 char),
    INTENTOS       NUMBER(10),
    NACIONALIDAD   VARCHAR2(255 char),
    NOMBRE         VARCHAR2(100 char) not null,
    PASSWORD       VARCHAR2(255 char),
    ORGANISMO_ID   NUMBER(19)  constraint FKPORLWPX051U2QDC3YGBHVMOPU references INSCRIPCIONES.ORGANISMO,
    ROL_ID         NUMBER(19) constraint FKMNSMULAV5X7X4WC64XU2FPQDF references INSCRIPCIONES.ROL
);

create table INSCRIPCIONES.REPOSITORIO_ARCHIVOS
(
    ID             NUMBER(19)         not null primary key,
    CREADO         DATE,
    CREADO_POR     VARCHAR2(255 char),
    ESTADO         NUMBER(10),
    MODIFICADO     DATE,
    MODIFICADO_POR VARCHAR2(255 char),
    CUIL           VARCHAR2(255 char),
    DESCRIPCION    VARCHAR2(255 char) not null,
    INSCRIPCION    NUMBER(19)         not null,
    INSTANCIA      NUMBER(19)         not null,
    METADATA       VARCHAR2(255 char),
    NOMBRE         VARCHAR2(255 char) not null
);

create table INSCRIPCIONES.INSTANCIA_SEDE
(
    ID           NUMBER(22) not null constraint "INSTANCIA_SEDE_pk" primary key,
    INSTANCIA_ID NUMBER(22) not null constraint "INSTANCIA_SEDE_INSTANCIA_ID_fk" references INSCRIPCIONES.INSTANCIA,
    SEDE_ID      NUMBER(22) not null constraint "INSTANCIA_SEDE_SEDE_ID_fk"  references INSCRIPCIONES.SEDE,
    CUPOS        NUMBER(22),
    ESTADO       NUMBER(1),
    LUNES        NUMBER(1),
    MARTES       NUMBER(1),
    MIERCOLES    NUMBER(1),
    JUEVES       NUMBER(1),
    VIERNES      NUMBER(1),
    SABADO       NUMBER(1),
    DOMINGO      NUMBER(1),
    HORA_INICIO  DATE,
    HORA_FIN     DATE
);

create table INSCRIPCIONES.CLASE
(
    ID                NUMBER(22) not null  constraint "CLASE_pk" primary key,
    INSTANCIA_SEDE_ID NUMBER(22) constraint "CLASE_INSTANCIA_SEDE_ID_fk"  references INSCRIPCIONES.INSTANCIA_SEDE,
    NOMBRE            NVARCHAR2(250),
    FECHA             DATE,
    CREADO            DATE,
    CREADO_POR        NVARCHAR2(250),
    MODIFICADO        DATE,
    MODIFICADO_POR    NVARCHAR2(250),
    ESTADO            NUMBER(1)
);

create table INSCRIPCIONES.CLASE_ALUMNO
(
    ID             NUMBER(22) not null constraint CLASE_ALUMNO_PK primary key,
    USUARIO_ID     NUMBER(22) not null,
    ASISTENCIA     NUMBER(1),
    CREADO         DATE,
    MODIFICADO     DATE,
    CREADO_POR     NVARCHAR2(250),
    MODIFICADO_POR NVARCHAR2(250),
    ESTADO         NUMBER(1),
    CLASE_ID       NUMBER(19)  constraint "CLASE_ALUMNO_CLASE_ID_fk" references INSCRIPCIONES.CLASE
);

create table INSCRIPCIONES.CLASE_PROFESOR
(
    ID             NUMBER(22) not null constraint "CLASE_PROFESOR_pk" primary key,
    USUARIO_ID     NUMBER(22) not null,
    CREADO         DATE,
    CREADO_POR     NVARCHAR2(200),
    MODIFICADO     DATE,
    MODIFICADO_POR NVARCHAR2(200),
    ESTADO         NUMBER(1),
    CLASE_ID       NUMBER(22) constraint CLASE_PROFESOR_CLASE_FK references INSCRIPCIONES.CLASE
);
