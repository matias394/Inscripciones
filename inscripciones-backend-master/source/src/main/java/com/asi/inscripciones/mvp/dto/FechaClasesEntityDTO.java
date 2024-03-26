package com.asi.inscripciones.mvp.dto;

import java.time.LocalDate;
import java.util.List;

import com.asi.inscripciones.mvp.entity.Clase;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FechaClasesEntityDTO {
    LocalDate fecha;
    List<Clase> clases;

    public FechaClasesEntityDTO(LocalDate fecha, List<Clase> clases) {
        this.fecha = fecha;
        this.clases = clases;
    }
}
