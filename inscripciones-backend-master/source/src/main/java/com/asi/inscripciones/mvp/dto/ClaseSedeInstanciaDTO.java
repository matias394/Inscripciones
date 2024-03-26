package com.asi.inscripciones.mvp.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClaseSedeInstanciaDTO {

    String nombreInscripcion;
    String nombreInstancia;
    List<InstanciaSedeDTO> instanciaSedeDTO;
}
