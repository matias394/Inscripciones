-- DATA BASE
-- --------------------------------------------------------------------------------------------------------------
INSERT INTO ORGANISMO(ID, NOMBRE, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Organismo', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO CATEGORIA(ID, NOMBRE ,NIVEL, PADRE_ID, SEQ, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Categoria', '0',0,'0',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(0, 'Sin Rol', 'usuario sin rol ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(1, 'Administrador', 'usuario admininostrador ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(2, 'Organismo Curso', 'usuario con acceso para cursos ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(3, 'Profesor', 'usuario con acceso para profesor ',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO ROL(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(4, 'Organismo Evento', 'usuario con acceso para eventos',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO USUARIO(ID, ORGANISMO_ID, ROL_ID, DNI, CUIL, NOMBRE, APELLIDO, EMAIL, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0,0,1,'123456789', '123456789', 'Usuario Admin', 'Usuario Admin', 'admin@admin.com', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO PERMISO(ID, NOMBRE, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES(0, 'Sin Permiso', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO ORGANISMO_CATEGORIA(ID,ORGANISMO_ID,CATEGORIA_ID,ESTADO)
VALUES(0,0,0,1);



INSERT INTO SEDE(ID, NOMBRE, DIRECCION, PISO, EMAIL, TELEFONO, BLOQUEADO, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin sede', 'Sin direccion', 'Piso 1', 'sinemail@gmail.com', '123456789', 1, CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO NOTIFICACION(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Notificacion', 'No tiene Notificacion', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO NOTIFICACION(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(1, 'Correo', 'Correo Electronico', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO NOTIFICACION(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(2, 'BOTI', 'Mensajeria de Texto', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO NOTIFICACION(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(3, 'Correo + BOTI', 'Correo Electronico + Mensajeria de Texto ', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);




INSERT INTO MODALIDAD(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Modalidad', 'No tiene Modalidad', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO MODALIDAD(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(1, 'Presencial', 'Presencial' ,CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO MODALIDAD(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(2, 'Virtual', 'Virtual' ,CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);


INSERT INTO DEVEPIDATA.ESTADO(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Estado', 'Sin descripcion estado', CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);


INSERT INTO DEVEPIDATA.CORREO(ID, NOMBRE, ASUNTO, DESCRIPCION, HTML, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Correo', 'Sin Asunto', 'Sin Descripcion', 'Sin html',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO DEVEPIDATA.CORREO (ID, NOMBRE, ASUNTO, DESCRIPCION, HTML, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO) 
VALUES (1, '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Inscripciones</title>
	<style type="text/css">
		body, #bodyTable {
			height:100% !important;
			width:100% !important; 
			background-color: #F6F6F6;
			font-family: sans-serif;
			-webkit-font-smoothing: antialiased;
			font-size: 14px;
			line-height: 120%;
			margin: 0;
			padding: 0;		
		}
		table td {
			font-family: sans-serif;
			font-size: 14px;
			vertical-align: top; 
		}
		table, td {
			border-collapse:collapse;
		}
		a:link, a:visited, a:hover, a:active {
			text-decoration:none; color:black;
		}
		area {
			outline:none
		}
		img {
			border: 0;
			max-width: 100%;
			display: block;
			outline:none;
			text-decoration:none;
		}
		.ReadMsgBody{width:100%;} .ExternalClass{width:100%;} 
		.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
			line-height:100%;
		} 
		table, td {
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		} 
		img {
			-ms-interpolation-mode: bicubic;
		} 
		body, table, td, p, a, li, blockquote {
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		</style>

	<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
		<tbody>
		  <tr>
			<td bgcolor="#F6F6F6" style="background-color:#F6F6F6;" align="center" valign="top">
				<table border="0" cellpadding="0" cellspacing="0" width="500" align="center">
					<tbody>
					<tr>
						<td>
           					<div style="	
							   position: relative;
							   display: inline-block;
							   text-align: center;
							   width: 100%;">
							   <img style="height: 200px; width: 100%" src="https://www.ceoe.es/sites/ceoe-corporativo/files/styles/image_1200/public/content/image/2018/04/06/1/xmedia-file-3248-panoramica-de-buenos-aires.jpg,qitok=PO6Bkbla.pagespeed.ic.YpI-fjj0mU.webp"> 	
           					</div>
						</td>
					</tr>
					<tr bgcolor="#fff">
						<td valign="middle" style="line-height: 150%; text-align: left; padding: 35px 45px 30px;">
							<span style="display: inline-block;
										padding: 0 0.4em;
										font-size: .8125rem;
										text-decoration: none;
										text-transform: uppercase;
										min-height: 22px;
										font-weight: 400;
										text-align: center;
										white-space: nowrap;
										vertical-align: baseline;
										border-radius: 0.5rem;
										transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
										color: #38485c !important;
										background-color: #e9f3ed;
										text-transform: capitalize;
										box-shadow: 0 0 0 1px #26874a;">
								INSCRIPTO
							</span>
								<p>Curso</p>
								<h4>_Curso_</h4>
								<p>Instancia</p>
								<h4>_Instancia_</h4>
								<p>Organismo</p>
								<h4>_Organismo_</h4>
								<p>Solicitud de Inscripción</p>
								<h4>_Sede_</h4>
								<p>ID de Inscripción</p>
								<h4>N° _InscripcionId_</h4>
								<p>¿Cuándo y donde?</p>
						<div style="margin-top: -0.5rem;">
          					<div>
             					<div style="
								 float:left; 
								 width: 50%;
								 display:flex;
								 align-items: center;">	
									<img style="width: 32px; height: 32px; margin-right: 15px;" src="https://cdn-icons-png.flaticon.com/512/8327/8327839.png">
									<p>_Dia_</p>
             					</div>
                 				<div style="		
								 float:right; 
								 width: 50%;
								 display:flex;
								 align-items: center;">
									<img style="width: 32px; height: 32px; margin-right: 15px;" src="https://cdn-icons-png.flaticon.com/512/4682/4682553.png">
									<p>_Sede_</p>
             					</div>
							</div>
							<div>
								<div style="
								width: 100%;
								display:flex;
								align-items: center;
								margin-bottom:1rem;">
									<img style="width: 32px; height: 32px; margin-right: 15px;" src="https://cdn-icons-png.flaticon.com/512/1827/1827379.png">
									<p>_Hora_</p>
								</div>
							</div>
						</div>
							<div style="">
								<p>Información del Solicitante</p>
								<div style="
									display: flex;
									align-items: center;
									margin-top: -0.5rem;">	
									<img style="width: 32px; height: 32px; margin-right: 15px;" src="https://cdn-icons-png.flaticon.com/128/3171/3171065.png">
									<p>_NombreSolicitante_</p>
									</div>			
								</div>       
						 	</td>
					 	</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>', TIMESTAMP '2023-03-07 12:36:51', 'admin', TIMESTAMP '2023-03-07 12:36:51', 'admin', 1);



INSERT INTO TIPO(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Sin Tipo', 'Sin Tipo' ,CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO TIPO(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(1, 'Curso', 'Curso' ,CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);

INSERT INTO TIPO(ID, NOMBRE, DESCRIPCION, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(2, 'Evento', 'Evento' ,CURRENT_DATE, 'admin', CURRENT_DATE, 'admin', 1);



INSERT INTO FORMULARIO(ID, NOMBRE, DESCRIPCION, ID_REF_MONGO, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(0, 'Formulario Prueba', 'Descripcion Prueba','123456789',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin',1);

INSERT INTO FORMULARIO(ID, NOMBRE, DESCRIPCION, ID_REF_MONGO, CREADO, CREADO_POR, MODIFICADO, MODIFICADO_POR, ESTADO)
VALUES(1, 'Formulario Prueba 1', 'Descripcion Prueba 1','0014784',CURRENT_DATE, 'admin', CURRENT_DATE, 'admin',1);


