package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ClaseAlumnoDTO {

    private Long id;

    private String nombreApellido;

    private String email;

    private String cuil;

    private Long asitencias;

    private boolean asistio;

    private Long ausencias;

    private String porcentajeAsistencia;

    private Integer estado;
}
