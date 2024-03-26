ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS RENAME COLUMN INSTANCIA TO INSTANCIA_SEDE_ID;
ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS RENAME COLUMN INSCRIPCION TO INSCRIPCION_ID;

DELETE FROM INSCRIPCION.REPOSITORIO_ARCHIVOS;

ALTER TABLE INSCRIPCION.REPOSITORIO_QR RENAME COLUMN INSTANCIASEDE TO INSTANCIA_SEDE_ID;
ALTER TABLE INSCRIPCION.REPOSITORIO_QR RENAME COLUMN INSCRIPCION TO INSCRIPCION_ID;

ALTER TABLE INSCRIPCION.INSTANCIA_SEDE add FECHA_FIN DATE;

ALTER TABLE INSCRIPCION.CLASE
ADD (
    LUNES NUMBER(1,0),
    MARTES NUMBER(1,0),
    MIERCOLES NUMBER(1,0),
    JUEVES NUMBER(1,0),
    VIERNES NUMBER(1,0),
    SABADO NUMBER(1,0),
    DOMINGO NUMBER(1,0),
    HORA_INICIO DATE,
    HORA_FIN DATE
);


UPDATE INSCRIPCION.CLASE CLA SET
    LUNES = (SELECT LUNES FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    MARTES = (SELECT MARTES FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    MIERCOLES = (SELECT MIERCOLES FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    JUEVES = (SELECT JUEVES FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    VIERNES = (SELECT VIERNES FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    SABADO = (SELECT SABADO FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    DOMINGO = (SELECT DOMINGO FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    HORA_INICIO = (SELECT HORA_INICIO FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    HORA_FIN = (SELECT HORA_FIN FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID),
    ESTADO = (SELECT ESTADO FROM INSCRIPCION.INSTANCIA_SEDE INSE WHERE INSE.ID = CLA.INSTANCIA_SEDE_ID)
WHERE LUNES IS NULL;

COMMIT;
