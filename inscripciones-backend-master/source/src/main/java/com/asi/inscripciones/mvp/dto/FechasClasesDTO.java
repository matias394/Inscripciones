package com.asi.inscripciones.mvp.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FechasClasesDTO {
    LocalDate fecha;
    List<ClaseDataDTO> clases;

    public FechasClasesDTO(LocalDate fecha, List<ClaseDataDTO> clases) {
        this.fecha = fecha;
        this.clases = clases;
    }
}
