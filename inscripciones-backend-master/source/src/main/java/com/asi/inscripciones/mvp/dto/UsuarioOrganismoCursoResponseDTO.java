package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class UsuarioOrganismoCursoResponseDTO {

    String nombreInscripcion;

    String nombreCategoria;

    String nombreSede;

    String nombreModalidad;
}
