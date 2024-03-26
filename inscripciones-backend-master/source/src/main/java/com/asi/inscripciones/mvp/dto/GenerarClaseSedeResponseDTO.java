package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class GenerarClaseSedeResponseDTO {

    private String dias;
    private String horario;
    private List<LocalDate> fechaList;
}
