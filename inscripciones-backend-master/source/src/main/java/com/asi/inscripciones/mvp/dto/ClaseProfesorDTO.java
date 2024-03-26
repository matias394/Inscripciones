package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ClaseProfesorDTO {

    private String nombre;
    private String apellido;
    private String email;
}
