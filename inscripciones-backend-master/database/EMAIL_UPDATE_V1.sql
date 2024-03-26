UPDATE INSCRIPCION.CORREO SET HTML = EMPTY_CLOB() || '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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
        }' || '

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
' || '
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

                                        <a href="https://fotos.perfil.com/2022/07/14/trim/1280/720/ciudad-de-buenos-aires-1386884.jpg" target="_blank">
                                            <img style="height: 200px; width: 100%" src="https://fotos.perfil.com/2022/07/14/trim/1280/720/ciudad-de-buenos-aires-1386884.jpg">
                                        </a>
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
							    </span>' ||
        '
                                <a href="_QrImageBase64_" target="_blank">
                                    <div style="float: right;justify-content: center; text-align: center;">
                                        <img src="_QrImageBase64_" style="width: 130px; height: 130px; border-color: black; border: 1px solid black">
                                    </div>
                                </a>
								<p>Curso</p>
								<h4>_Curso_</h4>
								<p>Organismo</p>
								<h4>_Organismo_</h4>
								<p>Solicitud de Inscripción</p>
								<h4>_Sede_</h4>
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
									<p>_SedeDireccion_</p>
             					</div>
							</div>' ||
        '
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
					 	</tr>' ||
        '
                         <tr bgcolor="#fff">
                            <td valign="middle" style="line-height: 150%; text-align: left; padding: 35px 45px 30px;">
                                <center>
                                    <a href="_UrlCancelarInscripcion_" style="color: rgb(107, 107, 249); text-decoration: underline; cursor: pointer;">
                                        Cancelar Inscripcion
                                    </a>
                                </center>
                            </td>
                         </tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>'
WHERE ID = 1;