package com.asi.inscripciones.mvp.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClaseDetalleDTO {

    String nombreInscripcion;
    String nombreInstancia;
    String nombreClase;
    ClaseDTO claseDTO;

}
