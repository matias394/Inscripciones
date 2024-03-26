-- Generado por Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   en:        2022-11-22 13:51:49 COT
--   sitio:      Oracle Database 21c
--   tipo:      Oracle Database 21c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE categoria (
    id             NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(255) NOT NULL,
    nivel          NVARCHAR2(250) NOT NULL,
    padre_id       NUMBER(22),
    seq            NVARCHAR2(20) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id );

CREATE TABLE correo (
    id             NUMBER(22) NOT NULL,
    nomnbre        NVARCHAR2(255) NOT NULL,
    asunto         NVARCHAR2(255) NOT NULL,
    descripcion    NVARCHAR2(1000),
    html           CLOB NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE correo ADD CONSTRAINT correo_pk PRIMARY KEY ( id );

CREATE TABLE estado (
    id             NUMBER(10) NOT NULL,
    nombre         NVARCHAR2(250) NOT NULL,
    descripcion    NVARCHAR2(1000),
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE estado ADD CONSTRAINT estado_pk PRIMARY KEY ( id );

CREATE TABLE formulario (
    id             NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(250) NOT NULL,
    descripcion    NVARCHAR2(1000),
    id_ref_mongo   VARCHAR2(250) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(1) NOT NULL
);

ALTER TABLE formulario ADD CONSTRAINT formulario_pk PRIMARY KEY ( id );

CREATE TABLE formulario_inscripcion (
    id             NUMBER(22) NOT NULL,
    formulario_id  NUMBER(22) NOT NULL,
    inscripcion_id NUMBER(22) NOT NULL
);

ALTER TABLE formulario_inscripcion ADD CONSTRAINT formulario_inscripcion_pk PRIMARY KEY ( id );

CREATE TABLE inscripcion (
    id                NUMBER(22) NOT NULL,
    organismo_id      NUMBER(22) NOT NULL,
    sede_id           NUMBER(22) NOT NULL,
    correo_id         NUMBER(22) NOT NULL,
    categoria_id      NUMBER(22) NOT NULL,
    notificacion_id   NUMBER(22) NOT NULL,
    modalidad_id      NUMBER(22) NOT NULL,
    tipo_id           NUMBER(22) NOT NULL,
    estado_id         NUMBER(22) NOT NULL,
    sector_id         NUMBER(22) NOT NULL,
    vigencia_id       NUMBER(22) NOT NULL,
    feriado           NUMBER(2),
    cupos_grupales    NUMBER(2),
    login_miba        NUMBER(2),
    cantidad_maxima   NUMBER(20),
    cupos_inscripcion NUMBER(20),
    url               NVARCHAR2(250),
    desde             DATE,
    hasta             DATE,
    creado            DATE,
    creado_por        NVARCHAR2(250),
    modificado        DATE,
    modificado_por    NVARCHAR2(250),
    estado            NUMBER(2)
);

ALTER TABLE inscripcion ADD CONSTRAINT inscripcion_pk PRIMARY KEY ( id );

CREATE TABLE inscripcion_rol (
    id             NUMBER(22) NOT NULL,
    rol_id         NUMBER(22) NOT NULL,
    inscripcion_id NUMBER(22) NOT NULL
);

ALTER TABLE inscripcion_rol ADD CONSTRAINT usuario_rol_pkv1 PRIMARY KEY ( id );

CREATE TABLE inscripcion_usuario (
    id             NUMBER(22) NOT NULL,
    usuario_id     NUMBER(22) NOT NULL,
    inscripcion_id NUMBER(22) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE inscripcion_usuario ADD CONSTRAINT inscripcion_usuario_pk PRIMARY KEY ( id );

CREATE TABLE menu (
    id         NUMBER(22) NOT NULL,
    baja       NUMBER(2) NOT NULL,
    hijo_orden NUMBER(10),
    color      NVARCHAR2(255),
    estilo     NVARCHAR2(255),
    icono      NVARCHAR2(255),
    nombre     NVARCHAR2(255),
    padre_id   NUMBER(22) NOT NULL,
    ruta       NVARCHAR2(255)
);

ALTER TABLE menu ADD CONSTRAINT menu_pk PRIMARY KEY ( id );

CREATE TABLE modalidad (
    id             NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(250) NOT NULL,
    descripcion    NVARCHAR2(1000),
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE modalidad ADD CONSTRAINT modalidad_pk PRIMARY KEY ( id );

CREATE TABLE notificacion (
    id             NUMBER(10) NOT NULL,
    nombre         VARCHAR2(250) NOT NULL,
    descripcion    NVARCHAR2(1000),
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE notificacion ADD CONSTRAINT notificacion_pk PRIMARY KEY ( id );

CREATE TABLE organismo (
    id             NUMBER(22) NOT NULL,
    categoria_id   NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(255) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE organismo ADD CONSTRAINT organismo_pk PRIMARY KEY ( id );

CREATE TABLE organismo_categoria (
    id           NUMBER(22) NOT NULL,
    organismo_id NUMBER(22) NOT NULL,
    categoria_id NUMBER(22) NOT NULL
);

ALTER TABLE organismo_categoria ADD CONSTRAINT organismo_categoria_pk PRIMARY KEY ( id );

CREATE TABLE permiso (
    id             NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(255) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE permiso ADD CONSTRAINT permiso_pk PRIMARY KEY ( id );

CREATE TABLE permiso_menu (
    id         NUMBER(22) NOT NULL,
    permiso_id NUMBER(22) NOT NULL,
    menu_id    NUMBER(22) NOT NULL
);

ALTER TABLE permiso_menu ADD CONSTRAINT permiso_menu_pk PRIMARY KEY ( id );

CREATE TABLE rol (
    id             NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(250) NOT NULL,
    descripcion    NVARCHAR2(1000),
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE rol ADD CONSTRAINT rol_pk PRIMARY KEY ( id );

CREATE TABLE rol_permiso (
    id         NUMBER(22) NOT NULL,
    rol_id     NUMBER(22) NOT NULL,
    permiso_id NUMBER(22) NOT NULL
);

ALTER TABLE rol_permiso ADD CONSTRAINT rol_permiso_pk PRIMARY KEY ( id );

CREATE TABLE sector (
    id             NUMBER(22) NOT NULL,
    nombre         NUMBER(22) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE sector ADD CONSTRAINT sector_pk PRIMARY KEY ( id );

CREATE TABLE sede (
    id             NUMBER(22) NOT NULL,
    nombre         NVARCHAR2(22) NOT NULL,
    direccion      NVARCHAR2(2000) NOT NULL,
    piso           NVARCHAR2(250),
    email          NVARCHAR2(250),
    telefono       NVARCHAR2(250),
    bloqueado      NUMBER(2) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE sede ADD CONSTRAINT sede_pk PRIMARY KEY ( id );

CREATE TABLE tipo (
    id             NUMBER NOT NULL,
    nombre         NVARCHAR2(255) NOT NULL,
    descripcion    NVARCHAR2(1000),
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE tipo ADD CONSTRAINT tipo_pk PRIMARY KEY ( id );

CREATE TABLE usuario (
    id             NUMBER(22) NOT NULL,
    organismo_id   NUMBER(22) NOT NULL,
    dni            NVARCHAR2(22) NOT NULL,
    nombre         NVARCHAR2(255) NOT NULL,
    apellido       NVARCHAR2(255) NOT NULL,
    email          NVARCHAR2(255) NOT NULL,
    usuario        NVARCHAR2(50),
    contrasena     NVARCHAR2(10) NOT NULL,
    genero         NVARCHAR2(255),
    nacionalidad   NVARCHAR2(255),
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(2) NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id );

CREATE TABLE usuario_rol (
    id         NUMBER(22) NOT NULL,
    usuario_id NUMBER(22) NOT NULL,
    rol_id     NUMBER(22) NOT NULL
);

ALTER TABLE usuario_rol ADD CONSTRAINT usuario_rol_pk PRIMARY KEY ( id );

CREATE TABLE vigencia (
    id             NUMBER(22) NOT NULL,
    formato        NVARCHAR2(250) NOT NULL,
    descripcion    NVARCHAR2(1000) NOT NULL,
    creado         DATE NOT NULL,
    creado_por     NVARCHAR2(255) NOT NULL,
    modificado     DATE NOT NULL,
    modificado_por NVARCHAR2(255) NOT NULL,
    estado         NUMBER(1) NOT NULL
);

ALTER TABLE vigencia ADD CONSTRAINT vigencia_pk PRIMARY KEY ( id );

ALTER TABLE formulario_inscripcion
    ADD CONSTRAINT formulario_inscripcion_formulario_fk FOREIGN KEY ( formulario_id )
        REFERENCES formulario ( id );

ALTER TABLE formulario_inscripcion
    ADD CONSTRAINT formulario_inscripcion_inscripcion_fk FOREIGN KEY ( inscripcion_id )
        REFERENCES inscripcion ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_correo_fk FOREIGN KEY ( correo_id )
        REFERENCES correo ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_estado_fk FOREIGN KEY ( estado_id )
        REFERENCES estado ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_modalidad_fk FOREIGN KEY ( modalidad_id )
        REFERENCES modalidad ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_notificacion_fk FOREIGN KEY ( notificacion_id )
        REFERENCES notificacion ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_organismo_fk FOREIGN KEY ( organismo_id )
        REFERENCES organismo ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_sector_fk FOREIGN KEY ( sector_id )
        REFERENCES sector ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_sede_fk FOREIGN KEY ( sede_id )
        REFERENCES sede ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_tipo_fk FOREIGN KEY ( tipo_id )
        REFERENCES tipo ( id );

ALTER TABLE inscripcion_usuario
    ADD CONSTRAINT inscripcion_usuario_inscripcion_fk FOREIGN KEY ( inscripcion_id )
        REFERENCES inscripcion ( id );

ALTER TABLE inscripcion_usuario
    ADD CONSTRAINT inscripcion_usuario_usuario_fk FOREIGN KEY ( usuario_id )
        REFERENCES usuario ( id );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_vigencia_fk FOREIGN KEY ( vigencia_id )
        REFERENCES vigencia ( id );

ALTER TABLE menu
    ADD CONSTRAINT menu_menu_fk FOREIGN KEY ( padre_id )
        REFERENCES menu ( id );

ALTER TABLE organismo_categoria
    ADD CONSTRAINT organismo_categoria_categoria_fk FOREIGN KEY ( categoria_id )
        REFERENCES categoria ( id );

ALTER TABLE organismo_categoria
    ADD CONSTRAINT organismo_categoria_organismo_fk FOREIGN KEY ( organismo_id )
        REFERENCES organismo ( id );

ALTER TABLE permiso_menu
    ADD CONSTRAINT permiso_menu_menu_fk FOREIGN KEY ( menu_id )
        REFERENCES menu ( id );

ALTER TABLE permiso_menu
    ADD CONSTRAINT permiso_menu_permiso_fk FOREIGN KEY ( permiso_id )
        REFERENCES permiso ( id );

ALTER TABLE rol_permiso
    ADD CONSTRAINT rol_permiso_permiso_fk FOREIGN KEY ( permiso_id )
        REFERENCES permiso ( id );

ALTER TABLE rol_permiso
    ADD CONSTRAINT rol_permiso_rol_fk FOREIGN KEY ( rol_id )
        REFERENCES rol ( id );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_organismo_fk FOREIGN KEY ( organismo_id )
        REFERENCES organismo ( id );

ALTER TABLE inscripcion_rol
    ADD CONSTRAINT usuario_rol_inscripcion_fk FOREIGN KEY ( inscripcion_id )
        REFERENCES inscripcion ( id );

ALTER TABLE inscripcion_rol
    ADD CONSTRAINT usuario_rol_rol_fk FOREIGN KEY ( rol_id )
        REFERENCES rol ( id );

ALTER TABLE usuario_rol
    ADD CONSTRAINT usuario_rol_rol_fkv1 FOREIGN KEY ( rol_id )
        REFERENCES rol ( id );

ALTER TABLE usuario_rol
    ADD CONSTRAINT usuario_rol_usuario_fk FOREIGN KEY ( usuario_id )
        REFERENCES usuario ( id );



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            23
-- CREATE INDEX                             0
-- ALTER TABLE                             48
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
