package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Builder
@Data
public class InstanciaFiltroDTO {

    private Long id;
    private String nombre;
    private Integer estado;
    private String fechaInicio;
    private String fechaFin;

}
