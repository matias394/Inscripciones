package com.asi.inscripciones.mvp.entity.report;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MedioDeAsignacionResponse {
    String nombreApellido;

    String cuilDniPass;

    String email;

    String evento;

    String fechaEvento;

}
