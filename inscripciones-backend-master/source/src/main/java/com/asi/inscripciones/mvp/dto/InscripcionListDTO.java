package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InscripcionListDTO {
    private Long id;
    private String nombre;
    private Long organismoId;
    private String organismo;
    private String categoria;
    private String tipo;
    private String periodo;
    private String profesor;
    private Long notificacion;
    private Long correo;
}
