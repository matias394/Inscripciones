package com.asi.inscripciones.mvp.entity.report;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MedioDeAsignacionRequest {

    Long instanciaId;

    Long usuarioId;

    Long asistencia;

    Long modalidadId;

    LocalDate fechaInicio;

    LocalDate fechaFin;
}
