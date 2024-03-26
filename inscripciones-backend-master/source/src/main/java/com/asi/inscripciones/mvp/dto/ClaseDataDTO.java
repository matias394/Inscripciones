package com.asi.inscripciones.mvp.dto;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
@Data
public class ClaseDataDTO {

    Long id;
    String nombre;
    String nombreSede;
    Integer cupos;
    String nombreInstancia;
    String nombreClase;
    LocalTime horaInicio;
    LocalTime horaFin;
    LocalDate fechaInicio;
    LocalDate fechaFinal;
    LocalDate fecha;
    List<ClaseProfesorDTO> claseProfesorDTOList;
    List<ClaseAlumnoDTO> claseAlumnoDTOList;
}
