package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class InscripcionConsultaDTO {
    String id;
    String nombreCurso;
    Long instancia;
    String estadoInstancia;
    String sede;
    String estadoCiudadano;
    String createdAt;

    public InscripcionConsultaDTO(String id, String nombreCurso, Long instancia,
                                  String estadoInstancia, String sede, String estadoCiudadano, String createdAt) {
        this.id = id;
        this.nombreCurso = nombreCurso;
        this.instancia = instancia;
        this.estadoInstancia = estadoInstancia;
        this.sede = sede;
        this.estadoCiudadano = estadoCiudadano;
        this.createdAt = createdAt;
    }
}
