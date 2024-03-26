package com.asi.inscripciones.mvp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class InstanciaSedeResponseDTO {

    Long idInstancia;

    String nombreInstancia;

    LocalDate fechaInicio;

    LocalDate fechaFin;

}
