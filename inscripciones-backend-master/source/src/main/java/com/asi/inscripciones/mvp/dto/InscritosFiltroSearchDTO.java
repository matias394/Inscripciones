package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class InscritosFiltroSearchDTO {
    private String categoria;
    private String instanciaId;
    private String inscripcionId;
    private String sedeId;
    private String estado;

}
