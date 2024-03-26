package com.asi.inscripciones.mvp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstanciaDTO{
    private Long id;
    private Long inscripcion;
    private String nombreInscripcion;
    private String nombreSede;
    private Integer duracionSemana;
    private Long modalidad;
    private String modalidadName;
    private LocalDate vigenciaInicio;
    private LocalDate vigenciaFin;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDate limiteInscripcion;
    private Integer estado;
    private Integer bloqueado;
    private String nombre;
    private String nombreProfesores;
    private List<InstanciaSedeDTO> instanciaSedes;
    private List<String> instanciaSedesGrupo;

}
