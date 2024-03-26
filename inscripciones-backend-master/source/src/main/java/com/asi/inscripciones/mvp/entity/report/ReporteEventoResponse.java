package com.asi.inscripciones.mvp.entity.report;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReporteEventoResponse {

    String nombreApellido;

    String cuilDniPass;

    String email;

    String evento;

    String fechaEvento;

    Integer asistencia;
}
