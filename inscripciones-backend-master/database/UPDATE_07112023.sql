ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS RENAME COLUMN INSTANCIASEDE TO INSTANCIA_SEDE_ID;
ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS RENAME COLUMN INSCRIPCION TO INSCRIPCION_ID;
ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS add constraint REPOSITORIO_ARCHIVO_INSTANCIA_SEDE_ID_FK foreign key (INSTANCIA_SEDE_ID) references INSCRIPCION.INSTANCIA_SEDE(ID);
ALTER TABLE INSCRIPCION.REPOSITORIO_ARCHIVOS add constraint REPOSITORIO_ARCHIVO_INSCRIPCION_ID_FK foreign key (INSCRIPCION_ID) references INSCRIPCION.INSCRIPCION(ID);

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



COMMIT;