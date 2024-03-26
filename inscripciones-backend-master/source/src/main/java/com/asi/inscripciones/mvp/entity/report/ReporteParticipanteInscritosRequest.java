package com.asi.inscripciones.mvp.entity.report;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReporteParticipanteInscritosRequest {

    Long instanciaId;

    Long usuarioId;

    Long sedeId;

    LocalDate fechaInicio;

    LocalDate fechaFin;
}
