package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Builder
@Data
public class InscripcionProfesorDTO implements Serializable {

    private Long inscripcionId;
    private String nombre;
    private String sede;
    private String modalidad;
    private String categoria;
    private String cupos;

}
