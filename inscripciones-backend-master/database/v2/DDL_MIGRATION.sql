formulario -> dirigido
repositorio_archivo -> metada 4000

-- -----------------------------------------------
-- CREANDO NUEVO SECUENCIA
-- -----------------------------------------------
CREATE SEQUENCE SEQ_INSTANCIA_SEDE MINVALUE 1 START WITH 100 INCREMENT BY 1 CACHE 20;


-- -----------------------------------------------
-- CREANDO NUEVA TABLA
-- -----------------------------------------------
create table INSTANCIA_SEDE
(
    ID           NUMBER(22) not null constraint "INSTANCIA_SEDE_pk" primary key,
    INSTANCIA_ID NUMBER(22) not null constraint "INSTANCIA_SEDE_INSTANCIA_ID_fk" references INSTANCIA,
    SEDE_ID      NUMBER(22) not null constraint "INSTANCIA_SEDE_SEDE_ID_fk"  references SEDE,
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
ALTER TABLE INSTANCIA  ADD MODALIDAD_ID NUMBER(22) default 0 not null  constraint INSTANCIA_MODALIDAD_FK references MODALIDAD;


-- -----------------------------------------------
-- MODIFICAR TABLAS
-- -----------------------------------------------
ALTER TABLE REPOSITORIO_ARCHIVOS modify METADATA VARCHAR2(4000);

ALTER TABLE FORMULARIO modify DIRIGIDO VARCHAR2(255);


-- -----------------------------------------------
-- AGREGAMOS DATOS TABLA INSTANCIA_SEDE
-- -----------------------------------------------
INSERT INTO INSTANCIA_SEDE(ID, INSTANCIA_ID, SEDE_ID, CUPOS, ESTADO, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, HORA_INICIO, HORA_FIN)
SELECT
    SEQ_INSTANCIA_SEDE.nextval,
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
    INSCRIPCION INS
INNER JOIN INSTANCIA INT ON INS.ID = INT.INSCRIPCION_ID;


-- -----------------------------------------------
-- ACTUALIZAMOS DATOS TABLA INSTANCIA
-- -----------------------------------------------
UPDATE INSTANCIA T1 SET T1.MODALIDAD_ID = (SELECT T2.MODALIDAD_ID FROM INSCRIPCION T2 WHERE T1.INSCRIPCION_ID = T2.ID);



-- -----------------------------------------------
-- BORRAMOS FK
-- -----------------------------------------------
ALTER TABLE CLASE DROP CONSTRAINT CLASE_INSTANCIA_FK;


-- -----------------------------------------------
-- BORRAMOS COLUMNAS
-- -----------------------------------------------
ALTER TABLE INSCRIPCION drop column SEDE_ID;
ALTER TABLE INSCRIPCION drop column MODALIDAD_ID;
ALTER TABLE INSCRIPCION drop column CUPOS_INSCRIPCION;

ALTER TABLE INSTANCIA drop column LUNES;
ALTER TABLE INSTANCIA drop column MARTES;
ALTER TABLE INSTANCIA drop column MIERCOLES;
ALTER TABLE INSTANCIA drop column JUEVES;
ALTER TABLE INSTANCIA drop column VIERNES;
ALTER TABLE INSTANCIA drop column SABADO;
ALTER TABLE INSTANCIA drop column DOMINGO;
ALTER TABLE INSTANCIA drop column HORA_INICIO;
ALTER TABLE INSTANCIA drop column HORA_FIN;