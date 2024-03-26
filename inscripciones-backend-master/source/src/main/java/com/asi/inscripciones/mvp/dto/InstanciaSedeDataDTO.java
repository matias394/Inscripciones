package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InstanciaSedeDataDTO {
    private Long id;
    private String nombreSede;
    private Integer cupos;
    private String sedeUrl;
    private List<ClaseDataDTO> clasedatas;
    private List<ClaseProfesorDTO> claseProfesors;
    private List<FechasClasesDTO> fechaClases;
    private List<FechaDiasDTO> fechaDias;
}
