package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class AsignarProfesorDTO {

    private Long inscripcionId;

    private Long instanciaId;

    private Long claseId;

    private List<Long> profesores;

}
