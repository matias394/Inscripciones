package com.asi.inscripciones.mvp.dto;

import lombok.Data;

import java.util.List;
@Data
public class ClaseInstanciaDTO {

    String nombreInscripcion;
    String nombreInstancia;
    List<ClaseDTO> claseDTO;
}
