-- DATA BASE
-- --------------------------------------------------------------------------------------------------------------
INSERT INTO ORGANISMO(ID, NOMBRE, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Organismo', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO CATEGORIA(ID, NOMBRE ,NIVEL, PADRE_ID, SEQ, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Categoria', '0',0,'0',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(0, 'Sin Rol', 'usuario sin rol ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(1, 'Administrador', 'usuario sin rol ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(2, 'Organismo', 'usuario sin rol ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(3, 'Profesor', 'usuario sin rol ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO USUARIO(ID, ORGANISMO_ID, ROL_ID, DNI, CUIL, NOMBRE, APELLIDO, EMAIL, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0,0,0,'123456789', '123456789', 'Usuario Admin', 'Usuario Admin', 'admin@admin.com', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO PERMISO(ID, NOMBRE, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(0, 'Sin Permiso', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);


INSERT INTO ORGANISMO_CATEGORIA(ID,ORGANISMO_ID,CATEGORIA_ID,ESTADO)
VALUES(0,0,0,1);
