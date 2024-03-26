-- -----------------------------------------------
-- CREANDO NUEVO SECUENCIA
-- -----------------------------------------------
CREATE SEQUENCE INSCRIPCION.SEQ_INSTANCIA_SEDE MINVALUE 1 START WITH 100 INCREMENT BY 1 CACHE 20;


-- -----------------------------------------------
-- CREANDO NUEVA TABLA
-- -----------------------------------------------
create table INSCRIPCION.INSTANCIA_SEDE
(
    ID           NUMBER(22) not null constraint "INSTANCIA_SEDE_pk" primary key,
    INSTANCIA_ID NUMBER(22) not null constraint "INSTANCIA_SEDE_INSTANCIA_ID_fk" references INSCRIPCION.INSTANCIA,
    SEDE_ID      NUMBER(22) not null constraint "INSTANCIA_SEDE_SEDE_ID_fk"  references INSCRIPCION.SEDE,
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


-- -----------------------------------------------
-- AGREGAR CAMPO A TABLA
-- -----------------------------------------------
ALTER TABLE INSCRIPCION.INSTANCIA ADD MODALIDAD_ID NUMBER(22) default 0 not null  constraint INSTANCIA_MODALIDAD_FK references INSCRIPCION.MODALIDAD;


-- -----------------------------------------------
-- MODIFICAR TABLAS
-- -----------------------------------------------
ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS modify METADATA VARCHAR2(4000);

ALTER TABLE INSCRIPCION.FORMULARIO modify DIRIGIDO VARCHAR2(255);


-- -----------------------------------------------
-- AGREGAMOS DATOS TABLA INSTANCIA_SEDE
-- -----------------------------------------------
INSERT INTO INSCRIPCION.INSTANCIA_SEDE(ID, INSTANCIA_ID, SEDE_ID, CUPOS, ESTADO, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, HORA_INICIO, HORA_FIN)
SELECT
    INSCRIPCION.SEQ_INSTANCIA_SEDE.nextval,
    INT.ID,
    INS.SEDE_ID,
    INS.CUPOS_INSCRIPCION,
    1,
    INT.LUNES,
    INT.MARTES,
    INT.MIERCOLES,
    INT.JUEVES,
    INT.VIERNES,
    INT.SABADO,
    INT.DOMINGO,
    INT.HORA_INICIO,
    INT.HORA_FIN
FROM
    INSCRIPCION.INSCRIPCION INS
INNER JOIN INSCRIPCION.INSTANCIA INT ON INS.ID = INT.INSCRIPCION_ID;


-- -----------------------------------------------
-- ACTUALIZAMOS DATOS TABLA INSTANCIA
-- -----------------------------------------------
UPDATE INSCRIPCION.INSTANCIA T1 SET T1.MODALIDAD_ID = (SELECT T2.MODALIDAD_ID FROM INSCRIPCION.INSCRIPCION T2 WHERE T1.INSCRIPCION_ID = T2.ID);



-- -----------------------------------------------
-- BORRAMOS FK
-- -----------------------------------------------
ALTER TABLE INSCRIPCION.CLASE DROP CONSTRAINT CLASE_INSTANCIA_FK;


-- -----------------------------------------------
-- BORRAMOS COLUMNAS
-- -----------------------------------------------
ALTER TABLE INSCRIPCION.INSCRIPCION drop column SEDE_ID;
ALTER TABLE INSCRIPCION.INSCRIPCION drop column MODALIDAD_ID;
ALTER TABLE INSCRIPCION.INSCRIPCION drop column CUPOS_INSCRIPCION;

ALTER TABLE INSCRIPCION.INSTANCIA drop column LUNES;
ALTER TABLE INSCRIPCION.INSTANCIA drop column MARTES;
ALTER TABLE INSCRIPCION.INSTANCIA drop column MIERCOLES;
ALTER TABLE INSCRIPCION.INSTANCIA drop column JUEVES;
ALTER TABLE INSCRIPCION.INSTANCIA drop column VIERNES;
ALTER TABLE INSCRIPCION.INSTANCIA drop column SABADO;
ALTER TABLE INSCRIPCION.INSTANCIA drop column DOMINGO;
ALTER TABLE INSCRIPCION.INSTANCIA drop column HORA_INICIO;
ALTER TABLE INSCRIPCION.INSTANCIA drop column HORA_FIN;

COMMIT;