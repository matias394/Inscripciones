package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Builder
@Data
public class InstanciaDataDTO {

    private Long id;
    private String nombre;
    private String periodo;
    private Integer estado;
    private String modalidad;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private List<InstanciaSedeDataDTO> instanciaSedeDataDTO;

}
