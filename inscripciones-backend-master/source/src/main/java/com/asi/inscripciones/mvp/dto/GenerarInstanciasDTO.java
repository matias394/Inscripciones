package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record GenerarInstanciasDTO(

    String nombre,

    Long modalidad,
    Integer duracionSemana,
    //@JsonFormat(pattern="yyyy-MM-dd")
    LocalDate vigenciaInicio,
    //@JsonFormat(pattern="yyyy-MM-dd")
    LocalDate vigenciaFin,
    Integer limiteInscripcion,
    Integer bloqueado,
    List<InstanciaSedeDTO> InstanciaSedeDTO

) {}
