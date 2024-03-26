
package com.asi.inscripciones.mvp.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;


@SuppressWarnings("serial")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class UsuarioViewRest implements Serializable {

	// Fields
	@JsonProperty("usuario")
	private String usuario;
	@JsonProperty("nombre")
	private String nombre;
	@JsonProperty("apellido")
	private String apellido;
	@JsonProperty("id_perfil")
	private int id_perfil;
	@JsonProperty("grupo")
	private int id_grupo;


}