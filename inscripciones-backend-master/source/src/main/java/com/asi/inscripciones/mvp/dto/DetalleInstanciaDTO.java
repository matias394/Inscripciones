package com.asi.inscripciones.mvp.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
public class DetalleInstanciaDTO {

    private String nombreInscripcion;
    private List<InstanciaDTO> InstanciaDTOList;

}
