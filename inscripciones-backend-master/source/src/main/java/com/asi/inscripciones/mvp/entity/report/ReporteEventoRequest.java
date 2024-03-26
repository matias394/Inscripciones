package com.asi.inscripciones.mvp.entity.report;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReporteEventoRequest {

    Long instanciaId;

    Long usuarioId;

    Long asistencia;

    Long sedeId;

    LocalDate fechaInicio;

    LocalDate fechaFin;
}
