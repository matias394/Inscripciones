package com.asi.inscripciones.mvp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenerarClaseSedeDTO {

    private Long sede;
    private Integer cupos;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private ArrayList<DiaDTO> dias;
    private LocalDate vigenciaInicio;
    private LocalDate vigenciaFin;

}
