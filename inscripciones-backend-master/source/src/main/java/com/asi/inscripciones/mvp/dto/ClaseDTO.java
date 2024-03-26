package com.asi.inscripciones.mvp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.asi.inscripciones.mvp.entity.Sede;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClaseDTO {

    private Long id;
    private String nombre;
    private String dia;
    private LocalDate fecha;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String nombreProfesores;
    private Integer estado;
    private Long instanciaSedeId;
    private String sede;
}
