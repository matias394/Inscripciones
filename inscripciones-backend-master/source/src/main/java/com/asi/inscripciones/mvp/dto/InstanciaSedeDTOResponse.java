package com.asi.inscripciones.mvp.dto;

import com.asi.inscripciones.mvp.entity.Instancia;
import com.asi.inscripciones.mvp.entity.Sede;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class InstanciaSedeDTOResponse {


    private Long id;

    private Integer cupos;

    private LocalTime horaInicio;

    private LocalTime horaFin;

    private LocalDate fechaInicio;

    private Instancia instancia;

    private Sede sede;

    private String urlSede;

    private Integer lunes;

    private Integer martes;

    private Integer miercoles;

    private Integer jueves;

    private Integer viernes;

    private Integer sabado;

    private Integer domingo;

}
